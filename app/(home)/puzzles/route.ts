import fs from "fs"
import { NextResponse } from "next/server"
import {
  puzzlePropertiesSchema,
  type PuzzleProperties,
} from "@/schemas/puzzles"

import { rootDomain } from "@/config/domains"
import { createPuzzleClues } from "@/lib/openai"
import { stringListToArray, toUpperCaseNoSpaces } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const puzzleProperties = (await request.json()) as PuzzleProperties
    puzzlePropertiesSchema.parse(puzzleProperties)

    const { size, answers } = puzzleProperties
    const answersList = stringListToArray(answers)

    const answersIndex = answersList.reduce((acc, answer) => {
      const formattedAnswer = toUpperCaseNoSpaces(answer)
      acc[formattedAnswer] = { answer }
      return acc
    }, {} as Record<string, Record<string, string>>)

    const crosswordProperties = {
      size: size || 20,
      answers: answersList.map((answer) => toUpperCaseNoSpaces(answer)),
    }

    // const response = await fetch(`${rootDomain}/api/crosswords`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(crosswordProperties),
    // })
    // const data = await response.json()

    // Temporarily read example output file until API is ready
    const response = fs.readFileSync(
      "./python/output/crossword_glossary.json",
      "utf8"
    )
    const data = JSON.parse(response)

    // TODO: Correctly type this / clean up
    const crosswordData = { across: {}, down: {} }
    for (const [number, glossary] of Object.entries(data) as any) {
      const row = glossary[0]
      const col = glossary[1]
      const answer = glossary[2]
      const direction = glossary[3].toLowerCase()

      answersIndex[answer].direction = direction
      answersIndex[answer].number = number

      crosswordData[direction][number] = {
        answer,
        row,
        col,
      }
    }

    const puzzleClues = await createPuzzleClues(puzzleProperties)
    puzzleClues.forEach(({ answer, clue }) => {
      const formattedAnswer = toUpperCaseNoSpaces(answer)
      const { direction, number } = answersIndex[formattedAnswer]
      crosswordData[direction][number].clue = clue
    })

    return NextResponse.json({ data: crosswordData })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { data: null, error: "Failed to create puzzle" },
      { status: 500 }
    )
  }
}

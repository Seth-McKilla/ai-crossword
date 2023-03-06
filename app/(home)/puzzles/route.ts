import { NextResponse } from "next/server"
import {
  puzzlePropertiesSchema,
  type PuzzleProperties,
} from "@/schemas/puzzles"

import { rootDomain } from "@/config/domains"
import { createPuzzleClues } from "@/lib/openai"
import { stringListToArray } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const puzzleProperties = (await request.json()) as PuzzleProperties
    puzzlePropertiesSchema.parse(puzzleProperties)

    const { size, answers, ...properties } = puzzleProperties
    const answersList = stringListToArray(answers)
    const crosswordProperties = {
      size: size || 20,
      answers: answersList,
    }

    const response = await fetch(`${rootDomain}/api/crosswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crosswordProperties),
    })
    const data = await response.json()
    console.log(data)

    const puzzleClues = await createPuzzleClues(puzzleProperties)

    return NextResponse.json({ data: puzzleClues })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { data: null, error: "Failed to create puzzle" },
      { status: 500 }
    )
  }
}

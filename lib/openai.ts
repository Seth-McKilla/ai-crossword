import { PuzzleProperties } from "@/schemas/puzzles"
import { Configuration, OpenAIApi } from "openai"
import { fromTheme } from "tailwind-merge"

import { stringListToArray, toSpaceCase } from "@/lib/utils"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
})
const openai = new OpenAIApi(configuration)

export type PuzzleClue = { answer: string; clue: string }

export const createPuzzleClues = async ({
  readingLevel: unformattedReadingLevel,
  theme: unformattedTheme,
  answers: unformattedAnswers,
}: PuzzleProperties) => {
  const readingLevel = toSpaceCase(unformattedReadingLevel)
  const theme = toSpaceCase(unformattedTheme)
  const answers = stringListToArray(unformattedAnswers)

  const puzzleClues = [] as PuzzleClue[]

  for (const answer of answers) {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a crossword clue with a ${theme} theme at the ${readingLevel} reading level whose answer is ${answer}. Don't include the ${answer} in the clue and don't prefix or suffix the clue with clue or answer, respectively.`,
        temperature: 0,
        max_tokens: 50,
      })
      const puzzleClue = response.data.choices[0].text
      puzzleClues.push({ answer, clue: puzzleClue })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return puzzleClues
}

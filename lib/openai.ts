import fs from "fs"
import { PuzzleProperties } from "@/schemas/puzzles"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
})
const openai = new OpenAIApi(configuration)

export const createPuzzleClues = async ({
  readingLevel,
  theme,
  answers,
}: PuzzleProperties) => {
  const answersArray = answers
    .replace(/,/g, " ")
    .replace(/\n/g, " ")
    .split(" ")
    .filter((answer) => {
      return answer.trim().length > 0
    })

  const puzzleClues = [] as { answer: string; clue: string }[]

  for (const answer of answersArray) {
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
export type PuzzleClues = Awaited<ReturnType<typeof createPuzzleClues>>

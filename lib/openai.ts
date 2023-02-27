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
        prompt: `Generate a crossword puzzle clue that doesn't contain the word ${answer} with a ${theme} theme at the ${readingLevel} reading level whose answer is ${answer}.`,
        temperature: 0,
        max_tokens: 50,
      })
      const puzzleClue = response.data.choices[0].text
      puzzleClues.push({ answer, clue: puzzleClue })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  fs.writeFileSync("./puzzleClues.json", JSON.stringify(puzzleClues, null, 2))
  return puzzleClues
}
export type PuzzleClues = Awaited<ReturnType<typeof createPuzzleClues>>

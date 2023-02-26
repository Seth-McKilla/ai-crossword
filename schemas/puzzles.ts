import * as z from "zod"

export const puzzlePropertiesSchema = z.object({
  readingLevel: z.string(),
  theme: z.string(),
  answers: z.string().refine(
    (value) => {
      const answers = value
        .split(/[\s,]+/)
        .filter((answer) => answer.length > 0)
      return answers.length >= 5 && answers.length <= 30
    },
    { message: "Must have between 5 and 30 answers" }
  ),
})
export type PuzzleProperties = z.infer<typeof puzzlePropertiesSchema>

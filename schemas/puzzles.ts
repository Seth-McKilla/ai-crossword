import * as z from "zod"

import { stringListToArray } from "@/lib/utils"

export const puzzlePropertiesSchema = z.object({
  readingLevel: z.string(),
  theme: z.string(),
  size: z.number().optional(),
  answers: z
    .string()
    .refine(
      (value) => {
        const answers = stringListToArray(value)
        return answers.length >= 5 && answers.length <= 30
      },
      { message: "Must have between 5 and 30 answers" }
    )
    .refine(
      (value) => {
        const answers = stringListToArray(value)
        return answers.every((answer) => answer.length <= 20)
      },
      {
        message: "All answers must be 20 characters or less",
      }
    ),
})
export type PuzzleProperties = z.infer<typeof puzzlePropertiesSchema>

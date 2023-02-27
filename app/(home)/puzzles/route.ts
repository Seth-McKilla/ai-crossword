import { NextResponse } from "next/server"
import {
  puzzlePropertiesSchema,
  type PuzzleProperties,
} from "@/schemas/puzzles"

import { createPuzzleClues } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const puzzleProperties = (await request.json()) as PuzzleProperties
    puzzlePropertiesSchema.parse(puzzleProperties)

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

import { NextResponse } from "next/server"
import {
  puzzlePropertiesSchema,
  type PuzzleProperties,
} from "@/schemas/puzzles"

export async function POST(request: Request) {
  try {
    const puzzleProperties = (await request.json()) as PuzzleProperties
    puzzlePropertiesSchema.parse(puzzleProperties)

    return NextResponse.json({ data: puzzleProperties })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { data: null, error: "Failed to create puzzle" },
      { status: 500 }
    )
  }
}

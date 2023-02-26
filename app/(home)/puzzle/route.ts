import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const puzzleProperties = await request.json()
  return NextResponse.json({ data: puzzleProperties })
}

import type { PuzzleClue } from "@/lib/openai"

interface ClueListProps {
  puzzleClues: PuzzleClue[]
}

export default function CluesList({ puzzleClues }: ClueListProps) {
  const sortedPuzzleClues = puzzleClues.reduce(
    (acc, curr, idx) => {
      if (idx % 2 === 0) {
        acc.push({
          across: curr,
          down: puzzleClues[idx + 1],
        })
      }
      return acc
    },
    [] as {
      across: PuzzleClue
      down: PuzzleClue
    }[]
  )

  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t border-slate-300 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
            <th className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Across
            </th>
            <th className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
              Down
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPuzzleClues.map(({ across, down }, idx) => (
            <tr
              key={idx}
              className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800"
            >
              {across && (
                <td className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
                  {`${idx * 2 + 1}. ${across?.clue} (${across?.answer})`}
                </td>
              )}
              {down && (
                <td className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
                  {`${idx * 2 + 2}. ${down?.clue} (${down?.answer})`}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

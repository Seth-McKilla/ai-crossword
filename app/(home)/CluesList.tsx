import type { PuzzleClues } from "@/lib/openai"

interface ClueListProps {
  puzzleClues: PuzzleClues
}

export default function CluesList({ puzzleClues }: ClueListProps) {
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
          {puzzleClues.map((clue, idx) => (
            <tr
              key={idx}
              className="m-0 border-t border-slate-200 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800"
            >
              <td className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
                {`${idx + 1}. ${clue}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  return (
    <>
      <section>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl mb-2">
          AI Crosswords
        </h1>
        <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
          Create your own crossword puzzles with the help of artificial
          intelligence.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl mb-4">
          Create a new puzzle
        </h2>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Easy</SelectItem>
              <SelectItem value="dark">Medium</SelectItem>
              <SelectItem value="system">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Whimsical</SelectItem>
              <SelectItem value="dark">Funny</SelectItem>
              <SelectItem value="system">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </>
  )
}

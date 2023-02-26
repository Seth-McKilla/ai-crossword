import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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
          <div className="flex-col space-y-2">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Reading Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kindergarten">Kindergarten</SelectItem>
                <SelectItem value="elementary-school">
                  Elementary School
                </SelectItem>
                <SelectItem value="middle-school">Middle School</SelectItem>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="college">College</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cryptic">Cryptic</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="iambic-pentameter">
                  Iambic Pentameter
                </SelectItem>
                <SelectItem value="noir">Noir</SelectItem>
                <SelectItem value="whimsical">Whimsical</SelectItem>
              </SelectContent>
            </Select>
            <Button size="lg" className="flex w-full space-x-1" type="submit">
              <span role="img" aria-label="Sparkles">
                ✨
              </span>
              <span>Generate Puzzle</span>
            </Button>
          </div>
          <div className="w-full">
            <Textarea
              className="min-h-[140px]"
              placeholder="Add 5 to 30 puzzle answers here, one per line or separated by commas."
            />
          </div>
        </div>
      </section>
    </>
  )
}

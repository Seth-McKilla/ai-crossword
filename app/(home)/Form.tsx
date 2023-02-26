"use client"

import {
  puzzlePropertiesSchema,
  type PuzzleProperties,
} from "@/schemas/puzzles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<PuzzleProperties>({
    resolver: zodResolver(puzzlePropertiesSchema),
  })

  const onSubmit = async (puzzleProperties: PuzzleProperties) => {
    try {
      const response = await fetch("/puzzles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(puzzleProperties),
      })
      const { data } = await response.json()
      console.log(data)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
      <div className="flex-col space-y-2">
        <Select
          value={watch("readingLevel")}
          onValueChange={(value) => {
            clearErrors("readingLevel")
            setValue("readingLevel", value)
          }}
        >
          <SelectTrigger
            className={cn(
              "min-w-[200px]",
              errors.readingLevel &&
                "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-500"
            )}
          >
            <SelectValue placeholder="Select a Reading Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kindergarten">Kindergarten</SelectItem>
            <SelectItem value="elementarySchool">Elementary School</SelectItem>
            <SelectItem value="middleSchool">Middle School</SelectItem>
            <SelectItem value="highSchool">High School</SelectItem>
            <SelectItem value="college">College</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={watch("theme")}
          onValueChange={(value) => {
            clearErrors("theme")
            setValue("theme", value)
          }}
        >
          <SelectTrigger
            className={cn(
              "min-w-[200px]",
              errors.theme &&
                "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-500"
            )}
          >
            <SelectValue placeholder="Select a Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cryptic">Cryptic</SelectItem>
            <SelectItem value="educational">Educational</SelectItem>
            <SelectItem value="iambicPentameter">Iambic Pentameter</SelectItem>
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
          {...register("answers")}
          className={cn(
            "min-h-[140px]",
            errors.answers &&
              "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          placeholder="Add 5 to 30 puzzle answers here, either one per line or separated by commas."
        />
        {errors.answers && (
          <p className="text-red-500 text-sm">{errors.answers.message}</p>
        )}
      </div>
    </form>
  )
}

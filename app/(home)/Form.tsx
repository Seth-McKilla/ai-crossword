"use client"

import { useForm } from "react-hook-form"

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
  const { register, handleSubmit, watch, setValue } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
      <div className="flex-col space-y-2">
        <Select
          value={watch("readingLevel")}
          onValueChange={(value) => setValue("readingLevel", value)}
        >
          <SelectTrigger className="w-[200px]">
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
          onValueChange={(value) => setValue("theme", value)}
          required
        >
          <SelectTrigger className="w-[200px]">
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
          className="min-h-[140px]"
          placeholder="Add 5 to 30 puzzle answers here, either one per line or separated by commas."
        />
      </div>
    </form>
  )
}

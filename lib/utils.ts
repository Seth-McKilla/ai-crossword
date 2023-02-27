import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const toSpaceCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
}

export const toUpperCaseNoSpaces = (str: string) => {
  return str.replace(/\s/g, "").toUpperCase()
}

export const stringListToArray = (str: string) => {
  return str
    .replace(/\n/g, ",")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
}

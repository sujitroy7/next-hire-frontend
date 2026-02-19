import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// for testing
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

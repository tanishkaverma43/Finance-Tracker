import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind classes and handles conditional/class merging cleanly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

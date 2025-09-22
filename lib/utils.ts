import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 👉 Jadi intinya:
// Sebelum convert → ada Prisma.Decimal, Date (raw JS object).
// Sesudah convert → semuanya jadi string/number biasa → aman dikirim ke client.

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}


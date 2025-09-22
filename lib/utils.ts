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


// formatNumberWithDecimal(15)
// "15.00"
// (karena tidak ada decimal)

// formatNumberWithDecimal(15.2)
// "15.20"
// (desimal 1 digit, dipaksa jadi 2 digit)

// formatNumberWithDecimal(15.234)
// "15.234"
// (desimal lebih dari 2, tetap dipakai semua)

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}
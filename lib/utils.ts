import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";
import { Prisma } from '@prisma/client';

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

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// menghindary any, memverifikasi tipe dengan cara yang aman instanceof, dsb
export function formatError(
  error: unknown
): string {
  // Handle Zod error
  if (error instanceof ZodError) {
    const fieldErrors = error.errors.map((err) => err.message);
    return fieldErrors.join('. ');
  }

  // Handle Prisma known request error (e.g. duplicate entry)
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    const field = Array.isArray(error.meta?.target) ? error.meta?.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Handle other error types
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback for unknown error shapes
  // Jika bukan tipe-tipe di atas, maka kembalikan pesan default agar tidak melempar error dari formatError itu sendiri
  return 'An unknown error occurred.';
}
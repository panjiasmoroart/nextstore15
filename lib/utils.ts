import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";
import { Prisma } from '@prisma/client';
import qs from 'query-string';

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

// console.log(round2(2.345));       // Output: 2.35
// console.log(round2(2.344));       // Output: 2.34
// console.log(round2("5.6789"));    // Output: 5.68
// console.log(round2("100.234"));   // Output: 100.23
// console.log(round2("7"));         // Output: 7

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error('Value is not a number or string');
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
});

// Format currency using the formatter above
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'NaN';
  }
}

// Format Number
const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

// Shorten UUID
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// formatId('8ff5859e-9df3-4628-bd93-720a47d4e071')
// '..d4e071'

// Format date and times
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Form the pagination links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);

  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    {
      skipNull: true,
    }
  );
}

'use server';
// jika jika kita menyimpan lib di local
// import { PrismaClient } from '@/lib/generated/prisma';
// import { convertToPlainObject } from '../utils';
// import { PrismaClient } from '@prisma/client'
import { prisma } from '@/db/prisma';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { ProductTypes } from "@/types";

// const prisma = new PrismaClient();

// Get latest products
// export async function getLatestProducts() {

//   const data = await prisma.product.findMany({
//     take: LATEST_PRODUCTS_LIMIT,
//     orderBy: { createdAt: 'desc' },
//   });

//   return convertToPlainObject(data);
// }

export async function getLatestProducts(): Promise<ProductTypes[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
    banner: product.banner ?? "",
    createdAt: product.createdAt.toISOString(),
  }));
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
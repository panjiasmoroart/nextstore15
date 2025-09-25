import { z } from 'zod';
import { cartItemSchema, insertCartSchema, insertProductSchema, shippingAddressSchema } from '@/lib/validators';
import { Prisma } from "@prisma/client";

export type ProductPayload = Prisma.ProductGetPayload<{}>;

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export interface ProductTypes {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  stock: number;
  price: string;
  rating: string;
  numReviews: number;
  isFeatured: boolean;
  banner: string;
  createdAt: string;
}

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
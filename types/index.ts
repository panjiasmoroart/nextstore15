import { z } from 'zod';
import { cartItemSchema, insertCartSchema, insertOrderItemSchema, insertOrderSchema, insertProductSchema, insertReviewSchema, paymentResultSchema, shippingAddressSchema } from '@/lib/validators';
import { Prisma } from "@prisma/client";
import { JsonValue } from '@prisma/client/runtime/library';

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
  banner: string | null;
  createdAt: string;
}

export type DBOrderItem = {
  name: string;
  slug: string;
  orderId: string;
  productId: string;
  qty: number;
  image: string;
  price: string;
};

export type OrderAdmin = {
  id: string;
  userId: string;
  createdAt: Date;
  shippingAddress: JsonValue;
  paymentMethod: string;
  paymentResult: JsonValue | null;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  itemsPrice: string;
  totalPrice: string;
  shippingPrice: string;
  taxPrice: string;
  user: {
    name: string;
  };
};

export type UserAdmin = {
  id: string;
  createdAt: Date;
  paymentMethod: string | null;
  name: string;
  image: string | null;
  role: string;
  address: JsonValue | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  updatedAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string; email: string };
};
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type PaymentResult = z.infer<typeof paymentResultSchema>;
export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};



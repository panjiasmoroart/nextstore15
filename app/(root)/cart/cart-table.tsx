"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Cart } from "@/types";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [addingItemId, setAddingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/logo.svg"
            width={48}
            height={48}
            alt={`${APP_NAME} logo`}
            priority={true}
          />
          <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Empty Cart</h1>
            <p className="text-destructive">
              You have not added any products to your shopping cart
            </p>
            <Button variant="outline" className="mt-4 ml-2" asChild>
              <Link href="/">Go Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 ">
          <div className="overflow-x-auto md:col-span-3 justify-center flex">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={removingItemId === item.productId}
                        variant="outline"
                        type="button"
                        onClick={async () => {
                          setRemovingItemId(item.productId);
                          const res = await removeItemFromCart(item.productId);
                          setRemovingItemId(null);

                          if (!res.success) {
                            toast.error(res.message);
                          } else {
                            toast.success(res.message);
                          }
                        }}
                      >
                        {removingItemId === item.productId ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={addingItemId === item.productId}
                        variant="outline"
                        type="button"
                        onClick={async () => {
                          setAddingItemId(item.productId);
                          const res = await addItemToCart(item);
                          setAddingItemId(null);

                          if (!res.success) {
                            toast.error(res.message);
                          } else {
                            toast.success(res.message);
                          }
                        }}
                      >
                        {addingItemId === item.productId ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((acc, curr) => acc + curr.qty, 0)})
                =
                <span className="font-bold">
                  &nbsp; {formatCurrency(cart.itemsPrice)}
                </span>
              </div>

              <Button
                className="w-full"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push("/shipping-address"))
                }
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;

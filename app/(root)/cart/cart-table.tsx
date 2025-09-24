import Link from "next/link";
import { Cart } from "@/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

const CartTable = ({ cart }: { cart?: Cart }) => {
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
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            {JSON.stringify(cart)}
          </div>
        </div>
      )}
    </>
  );
};

export default CartTable;

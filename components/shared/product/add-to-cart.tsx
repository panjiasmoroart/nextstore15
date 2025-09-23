"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    // Handle error
    if (!res.success) {
      toast.custom((t) => (
        <div className="bg-red-600 text-white px-4 py-3 rounded-md shadow-md flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{res.message}</span>
        </div>
      ));

      return;
    }

    toast.custom((t) => (
      <div className="relative bg-white dark:bg-neutral-900 text-black dark:text-white rounded-md shadow-lg border border-gray-200 dark:border-neutral-700">
        <button
          onClick={() => toast.dismiss(t)}
          aria-label="Close"
          className="absolute top-0 right-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary z-10"
        >
          ×
        </button>

        <div className="flex items-center px-6 py-3">
          <div className="text-sm font-medium">{item.name} - added to cart</div>

          <Button
            className="ml-auto bg-primary text-white hover:bg-gray-800"
            onClick={() => {
              router.push("/cart");
              toast.dismiss(t);
            }}
          >
            Go To Cart
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Add To Cart
    </Button>
  );
};

export default AddToCart;

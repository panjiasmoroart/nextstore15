import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddress = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();

  // userId bertipe: string | undefined
  const userId = session?.user?.id;

  if (!userId) throw new Error("No user ID");

  // ! Non-null assertion operator, dipastikan userId ada
  const user = await getUserById(userId!);

  return <div>ShippingAddress {JSON.stringify(user)}</div>;
};

export default ShippingAddress;

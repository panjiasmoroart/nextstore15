import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-form";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const PageShippingAddress = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();

  // userId bertipe: string | undefined
  const userId = session?.user?.id;

  if (!userId) throw new Error("No user ID");

  // ! Non-null assertion operator, dipastikan userId ada
  const user = await getUserById(userId!);

  // if (!user.address) {
  //   throw new Error("Shipping address is missing");
  // }

  return (
    <>
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default PageShippingAddress;

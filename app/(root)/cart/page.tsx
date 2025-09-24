import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";

export const metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  const parsedCart = cart
    ? {
        ...cart,
        itemsPrice: parseFloat(cart.itemsPrice),
        totalPrice: parseFloat(cart.totalPrice),
        shippingPrice: parseFloat(cart.shippingPrice),
        taxPrice: parseFloat(cart.taxPrice),
      }
    : undefined;

  return <CartTable cart={parsedCart} />;
};

export default CartPage;

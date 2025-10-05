import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import OrderDetailsTable from "./order-details-table";
import { DBOrderItem, ShippingAddress } from "@/types";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  // Redirect the user if they don't own the order
  if (order.userId !== session?.user.id && session?.user.role !== "admin") {
    return redirect("/unauthorized");
  }

  let client_secret = null;

  // Check if is not paid and using stripe
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    // Init stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        itemsPrice: Number(order.itemsPrice),
        shippingPrice: Number(order.shippingPrice),
        taxPrice: Number(order.taxPrice),
        totalPrice: Number(order.totalPrice),
        orderitems: order.orderitems.map((item: DBOrderItem) => ({
          ...item,
          price: Number(item.price),
        })),
      }}
      stripeClientSecret={client_secret}
      paypalClientId={process.env.PAYPAL_CLIENT_ID! || "sb"}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;

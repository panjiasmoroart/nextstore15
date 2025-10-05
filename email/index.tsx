import { Resend } from "resend";
import { SENDER_EMAIL, APP_NAME } from "@/lib/constants";
import { Order } from "@/types";
import dotenv from "dotenv";
dotenv.config();

import PurchaseReceiptEmail from "./purchase-receipt";

// const resend = new Resend(process.env.RESEND_API_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  // await resend.emails.send({
  //   from: `${APP_NAME} <${SENDER_EMAIL}>`,
  //   to: order.user.email,
  //   subject: `Order Confirmation ${order.id}`,
  //   react: <PurchaseReceiptEmail order={order} />,
  // });
  try {
    console.log("Sending email to:", order.user.email);

    const result = await resend.emails.send({
      from: `${APP_NAME} <${SENDER_EMAIL}>`,
      to: "tarxvfextract@gmail.com",
      subject: `Order Confirmation ${order.id}`,
      react: <PurchaseReceiptEmail order={order} />,
    });

    console.log("Email send result:", result);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders</h2>
      <div className="overflow-x-auto">OrdersPage - {page}</div>
    </div>
  );
};

export default OrdersPage;

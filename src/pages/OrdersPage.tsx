import { useEffect, useState } from "react";
import { fetchCarts } from "../api/fakestore";
import { enhanceOrders } from "../utils/helpers";
import type { EnhancedOrder, OrderStatus } from "../types/order";
import OrderCard from "../components/OrderCard";
import OrderFilter from "../components/OrderFilter";

export default function OrdersPage() {
  const [orders, setOrders] = useState<EnhancedOrder[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "All">("All");

  useEffect(() => {
    async function loadOrders() {
      try {
        const carts = await fetchCarts();
        const enhanced = await enhanceOrders(carts);
        setOrders(enhanced);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    loadOrders();
  }, []);

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-stone-200">Order Tracker</h1>
      <OrderFilter selected={filter} onChange={setFilter} />
      {filteredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

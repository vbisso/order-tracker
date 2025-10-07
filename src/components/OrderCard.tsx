import { useState } from "react";
import type { EnhancedOrder } from "../types/order";
import OrderProgressBar from "./OrderProgressBar";

interface OrderCardProps {
  order: EnhancedOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div
      onClick={toggleExpand}
      className={`mb-2 bg-stone-100 p-6 rounded-lg shadow border border-stone-200 transition-all duration-300 cursor-pointer hover:shadow-lg ${
        expanded ? "ring-2 ring-stone-400" : ""
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Order #{order.id}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            order.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "Shipped"
              ? "bg-blue-100 text-blue-700"
              : order.status === "Out for delivery"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      <p className="text-stone-600 mt-2">
        <strong>Estimated delivery:</strong>{" "}
        {new Date(order.deliveryDate).toLocaleDateString()}
      </p>
      <p className="text-stone-500 text-sm mt-1">
        Ordered on: {new Date(order.date).toLocaleDateString()}
      </p>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-5 space-y-4 animate-fadeIn">
          {/* Progress Bar */}
          <OrderProgressBar status={order.status} />

          {/* Products List */}
          <div>
            <h3 className="font-semibold text-stone-700 mb-2">
              Items in Order:
            </h3>
            <ul className="divide-y divide-stone-200">
              {order.products.map((p) => (
                <li
                  key={p.productId}
                  className="flex justify-between items-start py-3 text-stone-700"
                >
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-stone-500">
                      {p.category} • {p.description.slice(0, 60)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(p.price * p.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-stone-500">
                      {p.quantity} × ${p.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Total */}
          <p className="text-right font-bold mt-4 text-stone-800">
            Total: $
            {order.products
              .reduce((sum, p) => sum + p.price * p.quantity, 0)
              .toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

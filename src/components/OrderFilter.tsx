import type { OrderStatus } from "../types/order";

interface Props {
  selected: OrderStatus | "All";
  onChange: (status: OrderStatus | "All") => void;
}

const statuses: (OrderStatus | "All")[] = [
  "All",
  "Processing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

export default function OrderFilter({ selected, onChange }: Props) {
  return (
    <div className="mb-6 flex justify-end">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value as OrderStatus | "All")}
        className="border border-stone-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-stone-400 outline-none"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}

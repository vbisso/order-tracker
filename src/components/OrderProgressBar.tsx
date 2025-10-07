import type { OrderStatus } from "../types/order";

interface Props {
  status: OrderStatus;
}

const steps: OrderStatus[] = [
  "Processing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

export default function OrderProgressBar({ status }: Props) {
  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                i <= currentStep
                  ? "bg-green-500 border-green-500"
                  : "bg-white border-stone-300"
              }`}
            ></div>

            <span
              className={`text-xs mt-2 ${
                i <= currentStep
                  ? "text-green-700 font-medium"
                  : "text-stone-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="relative w-full mt-2">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-stone-300 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-green-500 -translate-y-1/2 transition-all duration-500 ease-out"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

import type {
  Cart,
  EnhancedOrder,
  ProductDetails,
  OrderStatus,
} from "../types/order";

// fetches a single product from the API
async function fetchProductDetails(productId: number): Promise<ProductDetails> {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${productId}`);
  const data = await res.json();

  return {
    productId,
    title: data.title,
    price: data.price,
    category: data.category,
    description: data.description,
    quantity: 0, // will be filled later from cart
  };
}

// generate a random realistic status and delivery date
function generateRandomStatusAndDate(): {
  status: OrderStatus;
  deliveryDate: string;
} {
  //   const statuses: OrderStatus[] = [
  //     "Processing",
  //     "Shipped",
  //     "Out for delivery",
  //     "Delivered",
  //   ];

  const randomDays = Math.floor(Math.random() * 10) + 1;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + randomDays);

  // logical progression based on days
  let status: OrderStatus;
  if (randomDays <= 2) status = "Out for delivery";
  else if (randomDays <= 5) status = "Shipped";
  else if (randomDays <= 8) status = "Processing";
  else status = "Delivered";

  return {
    status,
    deliveryDate: deliveryDate.toISOString().split("T")[0],
  };
}

// Main enhancer: merges cart + product details + random status/delivery
export async function enhanceOrders(carts: Cart[]): Promise<EnhancedOrder[]> {
  const enhancedOrders = await Promise.all(
    carts.map(async (cart) => {
      const { status, deliveryDate } = generateRandomStatusAndDate();

      const products: ProductDetails[] = await Promise.all(
        cart.products.map(async (p) => {
          const details = await fetchProductDetails(p.productId);
          return { ...details, quantity: p.quantity };
        })
      );

      return {
        ...cart,
        products,
        deliveryDate,
        status,
      };
    })
  );

  return enhancedOrders;
}

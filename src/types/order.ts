export interface ProductDetails {
  productId: number;
  title: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
}
export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: ProductDetails[];
}

export type OrderStatus =
  | "Processing"
  | "Shipped"
  | "Out for delivery"
  | "Delivered";

export interface EnhancedOrder extends Cart {
  deliveryDate: string;
  status: OrderStatus;
}

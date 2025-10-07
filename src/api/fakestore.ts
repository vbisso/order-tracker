import type { Cart } from "../types/order";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchCarts(limit?: number): Promise<Cart[]> {
  const res = await fetch(`${BASE_URL}/carts${limit ? `?limit=${limit}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch carts");
  return res.json();
}

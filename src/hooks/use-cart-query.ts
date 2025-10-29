"use client";

import { useQuery } from "@tanstack/react-query";

import { getCartProducts } from "@/lib/dal";
import { useCartStore } from "@/lib/store/cart-store";

export function useCartQuery() {
	const { cart } = useCartStore();

	const { data, status } = useQuery({
		queryKey: ["cart-products"],
		queryFn: () => getCartProducts(cart),
		retry: 3
	});

	return { data, status, cart, totalItems: cart.reduce((total, item) => total + item.quantity, 0) };
}

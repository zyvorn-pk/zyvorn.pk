"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useCartStore } from "@/lib/store/cart-store";
import { getCartProducts } from "@/lib/store/dal";

export interface CartItem {
	id: string;
	title: string;
	slug: string;
	stock: number;
	quantity: number;
	price: number;
	image: string;
}

export function useCart() {
	const items = useCartStore((state) => state.items);
	const syncCart = useCartStore((state) => state.syncCart);
	const productIds = items.map((item) => item.productId);

	const { data: products = [], status } = useQuery({
		queryKey: ["cart", productIds],
		queryFn: async () => {
			if (!productIds.length) return [];
			return await getCartProducts(productIds);
		},
		staleTime: 1000 * 60 * 5
	});

	useEffect(() => {
		if (status === "success" && products.length !== productIds.length) {
			const validIds = products.map((p) => p.id);
			syncCart(validIds);
		}
	}, [status, products, productIds.length, syncCart]);

	const cartItems = products.map((product) => {
		const cartItem = items.find((item) => item.productId === product.id);
		const quantity = cartItem?.quantity ?? 0;
		const price = product.discountPrice ?? product.salePrice;
		const image = product.images?.[0] ?? "";
		return { id: product.id, title: product.title, slug: product.slug, stock: product.stock, quantity, price, image };
	}) satisfies CartItem[];

	const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return { data: cartItems, status, totalAmount, count };
}

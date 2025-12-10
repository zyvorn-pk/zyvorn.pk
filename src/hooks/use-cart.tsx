"use client";

import { useQuery } from "@tanstack/react-query";

import type { Product } from "@/lib/prisma/client";
import { getCart } from "@/components/cart/actions";

export interface CartItem extends Pick<Product, "id" | "title" | "slug"> {
	image: string;
	quantity: number;
	price: number;
}

export function useCart() {
	const { data: cart, status } = useQuery({
		queryKey: ["cart"],
		queryFn: () => getCart()
	});

	const cartItems: CartItem[] =
		cart?.items.map((item) => {
			const product = item.product;
			const image = product.images?.[0] ?? "";

			return {
				id: item.product.id,
				title: item.product.title,
				slug: item.product.slug,
				quantity: item.quantity,
				price: item.product.discountPrice ?? item.product.salePrice,
				image
			};
		}) ?? [];

	const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return { data: cartItems, status, totalAmount, count, cartId: cart?.id };
}

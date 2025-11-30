"use server";

import "server-only";

import { db } from "@/lib/db";

export async function getCartProducts(productIds: string[]) {
	if (!productIds.length) return [];
	return await db.product.findMany({
		where: { id: { in: productIds }, status: "PUBLISHED", stock: { gt: 0 } },
		select: { id: true, title: true, slug: true, images: true, salePrice: true, discountPrice: true, stock: true }
	});
}

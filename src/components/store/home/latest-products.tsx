"use cache";

import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/product-card";

export async function LatestProducts() {
	cacheLife("weeks");
	cacheTag("latest-products");

	const products = await db.product.findMany({
		take: 10,
		where: { status: "PUBLISHED" },
		orderBy: { createdAt: "desc" }
	});

	return products.map((product) => <ProductCard key={product.id} product={product} />);
}

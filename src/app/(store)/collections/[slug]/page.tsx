"use cache";

import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/product-card";

export default async function StoreCollectionsPage({ params }: PageProps<"/collections/[slug]">) {
	const { slug } = await params;

	cacheLife("days");
	cacheTag(`${slug}-collection`);

	const products = await db.product.findMany({
		orderBy: { createdAt: "desc" },
		where: { status: "PUBLISHED", category: slug === "all" ? undefined : { slug } }
	});

	return (
		<div className="container mx-auto flex flex-col gap-4 px-4">
			<div className="flex justify-between">
				<h1 className="text-left text-xl/9 font-semibold capitalize">{`${slug} Products`}</h1>
			</div>
			<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

import Link from "next/link";

import type { Product } from "@/lib/prisma/client";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductImage } from "@/components/product/product-image";

export function ProductCard({ product }: { product: Omit<Product, "costPrice"> }) {
	return (
		<div className="relative space-y-1">
			<Link href={`/products/${product.slug}`} className="block space-y-1">
				<ProductImage src={product.images[0]} alt={product.title} size={220} transformation="listing" />
				<p className="line-clamp-2 text-sm leading-7 font-medium md:text-base">{product.title}</p>
			</Link>
			<div className="flex items-end gap-x-1">
				{product.discountPrice && <span className="leading-6 font-medium">{`Rs.${product.discountPrice}`}</span>}
				<span className={cn("block", product.discountPrice ? "text-muted-foreground text-sm font-normal line-through" : "font-medium")}>
					{`Rs.${product.salePrice}`}
				</span>
			</div>
		</div>
	);
}

export function ProductCardSkeleton({ length = 10 }: { length?: number }) {
	return Array.from({ length }, (_, i) => (
		<div key={i} className="relative space-y-1">
			<Skeleton className="aspect-square w-full" />
			<Skeleton className="h-6" />
			<Skeleton className="h-6 w-1/2" />
		</div>
	));
}

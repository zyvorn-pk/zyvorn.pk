import Link from "next/link";

import type { Product } from "@/lib/prisma/client";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/product/product-image";

export function ProductCard({ product }: { product: Product }) {
	return (
		<div className="relative space-y-1">
			<Link href={`/products/${product.slug}`} className="block space-y-1">
				<ProductImage src={product.images[0]} alt={product.title} size={220} transformation="listing" />
				<p className="line-clamp-2 text-sm font-medium md:text-base">{product.title}</p>
			</Link>
			<div className="flex items-end gap-x-1">
				{product.discountPrice && <span className="font-medium">{`Rs.${product.discountPrice}`}</span>}
				<span className={cn("block", product.discountPrice ? "text-muted-foreground text-sm font-normal line-through" : "")}>
					{`Rs.${product.salePrice}`}
				</span>
			</div>
		</div>
	);
}

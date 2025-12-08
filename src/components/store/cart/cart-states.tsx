import Link from "next/link";
import { ShoppingCartIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react";

import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductImage } from "@/components/product/product-image";

export function CartItem({ item, hasDelete }: { item: CartItem; hasDelete?: boolean }) {
	const removeItem = useCartStore((state) => state.removeItem);
	return (
		<Item variant="default" className="gap-3 p-0">
			<ItemMedia className="relative">
				<Link href={`/products/${item.slug}`} className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-md">
					<ProductImage src={item.image} alt={item.title} size={80} transformation="thumbnail" />
				</Link>
				<Badge variant="left">{item.quantity}</Badge>
			</ItemMedia>
			<ItemContent>
				<ItemTitle className="line-clamp-1">
					<Link href={`/products/${item.slug}`}>{item.title}</Link>
				</ItemTitle>
				<ItemDescription>Rs&nbsp;{formatPrice(item.price)}</ItemDescription>
				{hasDelete && (
					<Button variant="ghost" size="icon-sm" onClick={() => removeItem(item.id)}>
						<Trash2Icon className="text-destructive size-4" />
					</Button>
				)}
			</ItemContent>
		</Item>
	);
}

export function CartLoading({ length }: { length: number }) {
	return Array.from({ length }).map((_, index) => (
		<Item key={index} variant="default" className="gap-4 p-0">
			<ItemMedia variant="image" className="size-20">
				<Skeleton className="aspect-square size-full" />
			</ItemMedia>
			<ItemContent>
				<Skeleton className="h-5" />
				<Skeleton className="h-5 w-1/2" />
			</ItemContent>
		</Item>
	));
}

export function EmptyCart() {
	const toggleCart = useCartStore((state) => state.toggleCart);
	return (
		<Empty className="p-4 md:p-0">
			<EmptyContent className="gap-2">
				<EmptyMedia variant="icon">
					<ShoppingCartIcon />
				</EmptyMedia>
				<EmptyTitle>Your cart is empty</EmptyTitle>
				<LinkButton href="/collections/all" size="sm" className="rounded-full" onClick={() => toggleCart()}>
					Go to Shop
				</LinkButton>
			</EmptyContent>
		</Empty>
	);
}

export function CartError() {
	return (
		<Empty className="p-4 md:p-0">
			<EmptyContent className="gap-2">
				<EmptyMedia variant="icon">
					<TriangleAlertIcon />
				</EmptyMedia>
				<EmptyDescription>Something went wrong, Please try again!</EmptyDescription>
				<Button size="sm" className="rounded-full" onClick={() => window.location.reload()}>
					Retry
				</Button>
			</EmptyContent>
		</Empty>
	);
}

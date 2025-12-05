"use client";

import { format } from "date-fns";
import { TruckIcon } from "lucide-react";

import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";

export function ProductButtons({ stock, productId }: { stock: number; productId: string }) {
	const today = new Date();
	const deliveryStart = new Date().setDate(today.getDate() + 3);
	const deliveryEnd = new Date().setDate(today.getDate() + 5);

	const addItem = useCartStore((state) => state.addItem);

	if (!stock)
		return (
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<Button size="lg" className="rounded-full uppercase" disabled>
					Out of stock
				</Button>
			</div>
		);

	return (
		<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
			<Button size="lg" className="rounded-full uppercase" onClick={() => addItem(productId)}>
				Add to cart
			</Button>
			<Button size="lg" variant="outline" className="rounded-full uppercase">
				Buy now
			</Button>
			<div className="text-muted-foreground flex items-start gap-2 text-sm md:col-span-2 md:text-base">
				<TruckIcon size={20} className="shrink-0" />
				<p>
					Order now to get it between <span className="font-medium underline">{format(deliveryStart, "EEEE, dd MMMM")}</span> and{" "}
					<span className="font-medium underline">{format(deliveryEnd, "EEEE, dd MMMM")}</span>
				</p>
			</div>
		</div>
	);
}

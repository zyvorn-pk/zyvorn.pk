"use client";

import { format } from "date-fns";
import { TruckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buyNow } from "@/components/cart/actions";
import { addItemMutation } from "@/components/cart/mutations";

export function ProductButtons({ stock, productId }: { stock: number; productId: string }) {
	const today = new Date();
	const deliveryStart = new Date().setDate(today.getDate() + 3);
	const deliveryEnd = new Date().setDate(today.getDate() + 5);

	const { mutate } = addItemMutation();

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
			<Button size="lg" className="rounded-full uppercase disabled:opacity-100" onClick={() => mutate({ productId })}>
				Add to cart
			</Button>
			<Button size="lg" variant="outline" className="rounded-full uppercase" onClick={() => buyNow(productId)}>
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

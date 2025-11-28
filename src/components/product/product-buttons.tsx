"use client";

import { useState } from "react";
import { format } from "date-fns";
import { TruckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

export function ProductButtons({ stock }: { stock: number }) {
	const [count, setCount] = useState(1);
	const today = new Date();
	const deliveryStart = new Date().setDate(today.getDate() + 3);
	const deliveryEnd = new Date().setDate(today.getDate() + 5);

	if (!stock)
		return (
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<Button size="lg" className="h-12 rounded-full font-semibold uppercase" disabled>
					Out of stock
				</Button>
			</div>
		);

	return (
		<div className="space-y-6">
			<NumberField maxValue={stock} value={count} onValueChange={setCount} className="w-fit" />
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<Button size="lg" className="h-12 cursor-pointer rounded-full font-semibold uppercase">
					Add to cart
				</Button>
				<Button size="lg" variant="outline" className="h-12 cursor-pointer rounded-full font-semibold uppercase">
					Buy now
				</Button>
				<div className="text-muted-foreground flex items-start gap-2 text-sm md:col-span-2 md:text-base">
					<TruckIcon size={20} className="shrink-0" />
					<p className="">
						Order now to get it between <span className="font-medium underline">{format(deliveryStart, "EEEE, dd MMMM")}</span> and{" "}
						<span className="font-medium underline">{format(deliveryEnd, "EEEE, dd MMMM")}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

"use client";

import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "lucide-react";

import { useCartCount, useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetCloseButton,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import { CartError, CartItem, CartLoading, EmptyCart } from "@/components/store/cart/cart-states";

export function CartSheet() {
	const localCount = useCartCount();
	const isOpen = useCartStore((state) => state.isOpen);
	const toggleCart = useCartStore((state) => state.toggleCart);

	const cart = useCart();

	return (
		<Sheet open={isOpen} onOpenChange={toggleCart}>
			<SheetTrigger asChild>
				<Button variant="link" size="icon" className="relative">
					<ShoppingCartIcon />
					<span className="bg-foreground text-background absolute top-0.5 right-0.5 inline-flex size-4 items-center justify-center rounded-full text-[10px] tabular-nums">
						{cart.status === "pending" ? localCount : cart.count}
					</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="gap-0">
				<SheetHeader>
					<SheetTitle>Shopping Cart</SheetTitle>
					<SheetCloseButton />
					<SheetDescription hidden />
				</SheetHeader>
				<CartSheetContent {...cart} />
			</SheetContent>
		</Sheet>
	);
}

function CartSheetContent({ data, status, totalAmount, count }: ReturnType<typeof useCart>) {
	const router = useRouter();
	const localCount = useCartCount();

	if (status === "error") {
		return <CartError />;
	}

	if (status === "pending") {
		return (
			<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
				<CartLoading length={localCount} />
			</div>
		);
	}

	if (!count) {
		return <EmptyCart />;
	}

	return (
		<>
			<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
				{data.map((item) => (
					<CartItem key={item.id} item={item} hasDelete />
				))}
			</div>
			<SheetFooter className="gap-4 border-t">
				<div className="flex items-center justify-between font-semibold md:text-lg">
					<p>Subtotal:</p>
					<p>Rs&nbsp;{formatPrice(totalAmount)}</p>
				</div>
				<Button className="h-12 rounded-full font-semibold uppercase" onClick={() => router.push("/checkout")}>
					Checkout
				</Button>
			</SheetFooter>
		</>
	);
}

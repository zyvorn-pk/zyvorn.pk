"use client";

import { ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetCloseButton, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function CartSheet() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="link" size="icon" className="relative">
					<ShoppingCartIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="gap-0">
				<SheetHeader>
					<SheetTitle>Shopping Cart</SheetTitle>
					<SheetCloseButton />
					<SheetDescription hidden />
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}

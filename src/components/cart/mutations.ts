import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useCartContext } from "@/context/cart-context";
import { addToCart, removeFromCart } from "@/components/cart/actions";

export function addItemMutation() {
	const queryClient = useQueryClient();
	const { setOpen } = useCartContext();

	return useMutation({
		mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
			return await addToCart(productId, quantity);
		},
		onSuccess: async () => {
			await queryClient.refetchQueries({ queryKey: ["cart"] });
			setOpen(true);
		},
		onError: (error) => {
			console.error("Failed to add to cart", error);
			toast.error("Failed to add to cart");
		}
	});
}

export function removeItemMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ productId }: { productId: string }) => {
			return await removeFromCart(productId);
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["cart"] });
		}
	});
}

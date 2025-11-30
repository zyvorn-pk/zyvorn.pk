import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
	items: { productId: string; quantity: number }[];
	isOpen: boolean;
}

interface CartActions {
	addItem: (productId: string, quantity?: number) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	toggleCart: () => void;
	setOpen: (open: boolean) => void;
	syncCart: (validProductIds: string[]) => void;
}

export const useCartStore = create<CartState & CartActions>()(
	persist(
		(set, get) => ({
			items: [],
			isOpen: false,

			addItem: (productId, quantity = 1) => {
				const currentItems = get().items;
				const existingItem = currentItems.find((item) => item.productId === productId);

				if (existingItem) {
					set({
						items: currentItems.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)),
						isOpen: true
					});
				} else {
					set({ items: [...currentItems, { productId, quantity }], isOpen: true });
				}
			},

			removeItem: (productId) => {
				set({ items: get().items.filter((item) => item.productId !== productId) });
			},

			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(productId);
					return;
				}

				set({ items: get().items.map((item) => (item.productId === productId ? { ...item, quantity } : item)) });
			},

			clearCart: () => set({ items: [] }),

			toggleCart: () => set({ isOpen: !get().isOpen }),

			setOpen: (open) => set({ isOpen: open }),

			syncCart: (validProductIds) => {
				const currentItems = get().items;
				const validItems = currentItems.filter((item) => validProductIds.includes(item.productId));

				if (validItems.length !== currentItems.length) {
					set({ items: validItems });
				}
			}
		}),
		{ name: "cart" }
	)
);

export const useCartCount = () => {
	const items = useCartStore((state) => state.items);
	return items.reduce((count, item) => count + item.quantity, 0) ?? 0;
};

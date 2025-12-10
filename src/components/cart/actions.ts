"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import type { Prisma } from "@/lib/prisma/client";

const cartProductArgs = {
	select: {
		id: true,
		title: true,
		slug: true,
		images: true,
		salePrice: true,
		discountPrice: true
	}
} satisfies Prisma.ProductDefaultArgs;

export async function getCart(cartId?: string) {
	if (!cartId) {
		const cookieStore = await cookies();
		cartId = cookieStore.get("cartId")?.value;
	}

	if (!cartId) {
		const user = await getSession();
		if (!user) return null;
		return await db.cart.findFirst({
			where: { userId: user.user.id },
			include: {
				items: {
					include: { product: cartProductArgs },
					orderBy: { createdAt: "asc" }
				}
			}
		});
	}

	return await db.cart.findUnique({
		where: { id: cartId },
		include: {
			items: {
				include: { product: cartProductArgs },
				orderBy: { createdAt: "asc" }
			}
		}
	});
}

export async function createCart(isInstant: boolean = false) {
	const user = await getSession();
	const cart = await db.cart.create({ data: { userId: user?.user.id ?? null } });

	if (!isInstant) {
		const cookieStore = await cookies();
		cookieStore.set("cartId", cart.id, {
			path: "/",
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			httpOnly: false
		});
	}

	return cart;
}

export async function addToCart(productId: string, quantity: number = 1, cartId?: string) {
	if (!cartId) {
		const cookieStore = await cookies();
		cartId = cookieStore.get("cartId")?.value;
	}

	if (!cartId) {
		const cart = await createCart();
		cartId = cart.id;
	}

	const existingItem = await db.cartItem.findFirst({ where: { cartId, productId } });

	if (existingItem) {
		await db.cartItem.update({
			where: { id: existingItem.id },
			data: { quantity: existingItem.quantity + quantity }
		});
	} else {
		await db.cartItem.create({
			data: { cartId, productId, quantity }
		});
	}

	return { success: true, cartId };
}

export async function removeFromCart(productId: string, cartId?: string) {
	if (!cartId) {
		const cookieStore = await cookies();
		cartId = cookieStore.get("cartId")?.value;
	}

	if (!cartId) return { error: "No cart found" };

	const item = await db.cartItem.findFirst({ where: { cartId, productId } });

	if (item) {
		await db.cartItem.delete({ where: { id: item.id } });
	}

	return { error: null };
}

export async function updateCartItemQuantity(productId: string, quantity: number, cartId?: string) {
	if (!cartId) {
		const cookieStore = await cookies();
		cartId = cookieStore.get("cartId")?.value;
	}

	if (!cartId) return { error: "No cart found" };

	if (quantity <= 0) {
		return removeFromCart(productId, cartId);
	}

	const item = await db.cartItem.findFirst({ where: { cartId, productId } });

	if (item) {
		await db.cartItem.update({ where: { id: item.id }, data: { quantity } });
	}

	return { error: null };
}

export async function buyNow(productId: string, quantity: number = 1) {
	const cart = await createCart(true);
	await addToCart(productId, quantity, cart.id);
	redirect(`/checkout/${cart.id}`);
}

// export async function mergeCarts(userId: string) {
// 	if (!userId) return;

// 	const guestCartId = await getCartId();

// 	if (!guestCartId) return;

// 	const guestCart = await db.cart.findUnique({
// 		where: { id: guestCartId },
// 		include: { items: true }
// 	});

// 	if (!guestCart) return;

// 	let userCart = await db.cart.findFirst({
// 		where: { userId }
// 	});

// 	if (!userCart) {
// 		userCart = await db.cart.create({
// 			data: { userId }
// 		});
// 	}

// 	for (const item of guestCart.items) {
// 		const existingUserItem = await db.cartItem.findFirst({
// 			where: { cartId: userCart.id, productId: item.productId }
// 		});

// 		if (existingUserItem) {
// 			await db.cartItem.update({
// 				where: { id: existingUserItem.id },
// 				data: { quantity: existingUserItem.quantity + item.quantity }
// 			});
// 		} else {
// 			await db.cartItem.create({
// 				data: {
// 					cartId: userCart.id,
// 					productId: item.productId,
// 					quantity: item.quantity
// 				}
// 			});
// 		}
// 	}

// 	if (guestCart.id !== userCart.id) {
// 		await db.cart.delete({
// 			where: { id: guestCartId }
// 		});
// 	}

// 	const cookieStore = await cookies();

// 	cookieStore.set("cartId", userCart.id, {
// 		path: "/",
// 		secure: process.env.NODE_ENV === "production",
// 		sameSite: "lax",
// 		httpOnly: false
// 	});
// }

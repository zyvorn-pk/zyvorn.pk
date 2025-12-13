"use server";

import "server-only";

import { redirect, unstable_rethrow as rethrow } from "next/navigation";

import { getSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { getCart } from "@/components/cart/actions";
import { checkoutSchema, type CheckoutSchema } from "@/components/checkout/schema";

export async function checkoutAction(data: CheckoutSchema, cartId: string) {
	try {
		const { success } = checkoutSchema.safeParse(data);
		if (!success) return { error: "Please provide valid data" };

		const cart = await getCart(cartId);
		if (!cart || cart.items.length === 0) {
			return redirect("/");
		}

		const user = await getSession();

		const totalAmount = cart.items.reduce((acc, item) => acc + (item.product.discountPrice ?? item.product.salePrice) * item.quantity, 0);

		await db.order.create({
			data: {
				name: data.name,
				email: data.email,
				phone: data.phone,
				address: data.address,
				city: data.city,
				postalCode: data.postalCode || null,
				province: data.province,
				country: data.country,
				paymentMethod: data.paymentMethod,
				total: totalAmount,
				userId: user?.user.id ?? null,
				items: {
					create: cart.items.map((item) => ({
						quantity: item.quantity,
						productId: item.product.id,
						price: item.product.discountPrice ?? item.product.salePrice
					}))
				}
			}
		});

		await db.cart.delete({
			where: { id: cartId }
		});

		return { error: null };
	} catch (error) {
		rethrow(error);
		console.error(error);
		return { error: "Something went wrong, please try again" };
	}
}

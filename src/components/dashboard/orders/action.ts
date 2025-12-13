"use server";

import { refresh, updateTag } from "next/cache";

import { db } from "@/lib/db";
import type { ORDER_STATUS } from "@/lib/prisma/enums";

export async function updateOrderStatusAction(orderId: string, status: ORDER_STATUS) {
	try {
		await db.order.update({
			where: { id: orderId },
			data: { status }
		});

		updateTag("orders");
		updateTag(`order-${orderId}`);
		refresh();

		return { error: null };
	} catch (error) {
		return { error: "Something went wrong, please try again" };
	}
}

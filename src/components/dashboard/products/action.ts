"use server";

import { updateTag } from "next/cache";
import { unstable_rethrow as rethrow } from "next/navigation";

import { getAdminSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { productSchema, type ProductSchema } from "@/components/dashboard/products/schema";

export async function upserProductAction(data: ProductSchema, productId?: string) {
	try {
		const { error } = productSchema.safeParse(data);
		if (error) return { error: error.message };

		await getAdminSession();

		if (!productId) {
			await db.product.create({
				data: { ...data, description: data.description || null, discountPrice: data.discountPrice || null }
			});
		} else {
			await db.product.update({
				where: { id: productId },
				data: { ...data, description: data.description || null, discountPrice: data.discountPrice || null }
			});
			updateTag(`dashboard-product-${productId}`);
		}

		updateTag("dashboard-products");

		if (data.status === "PUBLISHED") {
			updateTag("latest-products");
			updateTag("all-collection");
			const category = await db.category.findUnique({ where: { id: data.categoryId } });
			updateTag(`${category?.slug}-collection`);
		}

		return { error: null };
	} catch (error) {
		rethrow(error);
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function deleteProductAction(productId: string) {
	try {
		await getAdminSession();

		const product = await db.product.delete({ where: { id: productId } });

		updateTag("dashboard-products");
		updateTag("latest-products");
		updateTag("all-collection");
		const category = await db.category.findUnique({ where: { id: product.categoryId } });
		updateTag(`${category?.slug}-collection`);

		return { error: null };
	} catch (error) {
		rethrow(error);
		console.error(error);
		return { error: "Something went wrong" };
	}
}

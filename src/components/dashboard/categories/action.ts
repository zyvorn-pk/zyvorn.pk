"use server";

import { updateTag } from "next/cache";
import { unstable_rethrow as rethrow } from "next/navigation";

import { getAdminSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { categorySchema, CategorySchema } from "@/components/dashboard/categories/schema";

export async function upsertCategoryAction(data: CategorySchema, categoryId?: string) {
	try {
		const { error } = categorySchema.safeParse(data);
		if (error) return { error: error.message };

		await getAdminSession();

		if (!categoryId) {
			await db.category.create({ data });
		} else {
			const { slug } = await db.category.update({ where: { id: categoryId }, data });
			updateTag(`category-${categoryId}`);
			updateTag(`${slug}-category`);
		}

		updateTag("categories");

		return { error: null };
	} catch (error) {
		rethrow(error);
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function deleteCategoryAction(categoryId: string) {
	try {
		await getAdminSession();

		await db.category.delete({ where: { id: categoryId } });

		updateTag("categories");

		return { error: null };
	} catch (error) {
		rethrow(error);
		console.error(error);
		return { error: "Something went wrong" };
	}
}

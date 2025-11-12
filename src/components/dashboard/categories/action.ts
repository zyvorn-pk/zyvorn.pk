"use server";

import { updateTag } from "next/cache";

import { getAdminSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { categorySchema, CategorySchema } from "@/components/dashboard/categories/schema";

export async function upsertCategoryAction(data: CategorySchema, categoryId?: string) {
	try {
		const { error } = categorySchema.safeParse(data);
		if (error) return { error: error.message };

		await getAdminSession();

		if (!categoryId) {
			await db.categroy.create({ data });
		} else {
			await db.categroy.update({ where: { id: categoryId }, data });
			updateTag(`category-${categoryId}`);
		}

		updateTag("dashboard-categories");

		return { error: null };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}

export async function deleteCategoryAction(categoryId: string) {
	try {
		await getAdminSession();

		await db.categroy.delete({ where: { id: categoryId } });

		updateTag("dashboard-categories");

		return { error: null };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" };
	}
}

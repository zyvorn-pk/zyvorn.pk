"use cache";

import "server-only";

import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";

export const getCategories = cache(async () => {
	cacheLife("days");
	cacheTag("categories");
	return await db.category.findMany();
});

export const getLatestProducts = cache(async () => {
	cacheLife("days");
	cacheTag("latest-products");
	return await db.product.findMany({
		take: 10,
		omit: { costPrice: true },
		where: { status: "PUBLISHED" },
		orderBy: { createdAt: "desc" }
	});
});

export const getCollectionProducts = cache(async (slug: string) => {
	cacheLife("days");
	cacheTag(`${slug}-collection`);

	if (slug === "all") {
		return await db.product.findMany({
			orderBy: { createdAt: "desc" },
			where: { status: "PUBLISHED" },
			omit: { costPrice: true }
		});
	}

	const category = await db.category.findUnique({ where: { slug } });
	if (!category) return notFound();

	return await db.product.findMany({
		omit: { costPrice: true },
		orderBy: { createdAt: "desc" },
		where: { status: "PUBLISHED", categoryId: category.id }
	});
});

"use cache";

import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";

export const getCategories = cache(async () => {
	cacheLife("days");
	cacheTag("categories");
	return await db.category.findMany();
});

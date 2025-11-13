import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { dashboardCategoriesColumn as columns } from "@/components/dashboard/categories/columns";
import { DashboardCategoriesTable } from "@/components/dashboard/categories/table";

async function getCategories() {
	"use cache";
	cacheLife("days");
	cacheTag("dashboard-categories");
	return await db.category.findMany({ include: { _count: { select: { products: true } } } });
}

export default async function DashboardCategoriesPage() {
	const data = await getCategories();
	return <DashboardCategoriesTable columns={columns} data={data} />;
}

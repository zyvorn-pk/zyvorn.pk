import { cacheLife, cacheTag } from "next/cache";

import { prisma } from "@/lib/db";
import { dashboardCategoriesColumn as columns } from "@/components/dashboard/categories/columns";
import { DashboardCategoriesTable } from "@/components/dashboard/categories/table";

async function getCategories() {
	"use cache";
	cacheLife("days");
	cacheTag("categories");
	return await prisma.categroy.findMany({ include: { _count: { select: { products: true } } } });
}

export default async function DashboardCategoriesPage() {
	const data = await getCategories();
	return <DashboardCategoriesTable columns={columns} data={data} />;
}

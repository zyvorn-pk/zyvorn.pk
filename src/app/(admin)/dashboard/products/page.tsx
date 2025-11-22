import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { dashboardProductsColumn as columns } from "@/components/dashboard/products/columns";
import { DashboardProductsTable } from "@/components/dashboard/products/table";

async function getProducts() {
	"use cache";
	cacheLife("days");
	cacheTag("dashboard-products");
	return await db.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
}

export default async function DashboardProductsPage() {
	const data = await getProducts();
	return <DashboardProductsTable columns={columns} data={data} />;
}

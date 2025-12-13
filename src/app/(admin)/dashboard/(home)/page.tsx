import { BadgeCentIcon, ShoppingBagIcon, ShoppingCartIcon, TrendingUpIcon } from "lucide-react";

import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getDashboardStats() {
	"use cache";
	const [ordersCount, cancelledOrdersCount, productsCount, totalRevenue, totalInventry, totalProfit] = await db.$transaction([
		db.order.count(),
		db.order.count({ where: { status: "CANCELLED" } }),
		db.product.count({ where: { status: "PUBLISHED" } }),
		db.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
		db.product.aggregate({ _sum: { costPrice: true }, where: { status: "PUBLISHED" } }),
		db.orderItem.findMany({
			where: { order: { NOT: { status: "CANCELLED" } } },
			select: { price: true, quantity: true, product: { select: { costPrice: true } } }
		})
	]);

	return {
		ordersCount,
		cancelledOrdersCount,
		productsCount,
		totalRevenue: totalRevenue._sum.total ?? 0,
		totalInventry: totalInventry._sum.costPrice ?? 0,
		totalProfit: totalProfit.reduce((acc, item) => acc + item.price * item.quantity - item.product.costPrice * item.quantity, 0) ?? 0
	};
}

export default async function DashboardHomePage() {
	const stats = await getDashboardStats();

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Inventry Cost</CardTitle>
					<ShoppingBagIcon className="text-muted-foreground size-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">PKR {formatPrice(stats.totalInventry)}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
					<BadgeCentIcon className="text-muted-foreground size-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">PKR {formatPrice(stats.totalRevenue)}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Profit</CardTitle>
					<TrendingUpIcon className="text-muted-foreground size-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">PKR {formatPrice(stats.totalProfit)}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Orders</CardTitle>
					<ShoppingCartIcon className="text-muted-foreground size-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{stats.ordersCount}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
					<ShoppingCartIcon className="text-muted-foreground size-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{stats.cancelledOrdersCount}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Published Products</CardTitle>
					<ShoppingCartIcon className="text-muted-foreground size-4" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{stats.productsCount}</div>
				</CardContent>
			</Card>
		</div>
	);
}

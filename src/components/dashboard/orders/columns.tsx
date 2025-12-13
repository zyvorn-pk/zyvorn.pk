"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";

import type { getOrders } from "@/lib/dal";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";

type OrderDetails = Awaited<ReturnType<typeof getOrders>>[number];

export const dashboardOrdersColumn: ColumnDef<OrderDetails>[] = [
	{
		id: "product",
		header: "Product",
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="bg-muted size-15 shrink-0 overflow-hidden rounded-sm">
					<ProductImage
						src={row.original.items[0].product.images[0]}
						alt={row.original.items[0].product.title}
						size={60}
						transformation="thumbnail"
					/>
				</div>
				<p className="line-clamp-2 max-w-60 font-medium text-pretty">{row.original.items[0].product.title}</p>
			</div>
		)
	},
	{
		header: "Customer",
		cell: ({ row }) => (
			<div className="flex flex-col">
				<span className="font-medium">{row.original.name}</span>
				<span className="text-muted-foreground text-xs">{row.original.email}</span>
			</div>
		)
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			return <Badge variant={status === "DELIVERED" ? "default" : status === "CANCELLED" ? "destructive" : "secondary"}>{status}</Badge>;
		}
	},
	{
		accessorKey: "total",
		header: "Total",
		cell: ({ row }) => <span className="font-medium">Rs.{row.original.total.toLocaleString()}</span>
	},
	{
		accessorKey: "createdAt",
		header: "Date",
		cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<LinkButton href={`/dashboard/orders/${row.original.id}`} variant="ghost" size="icon-sm">
						<EyeIcon className="size-4" />
					</LinkButton>
				</div>
			);
		}
	}
];

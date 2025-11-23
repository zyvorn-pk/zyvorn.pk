"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import type { Category, Product } from "@/lib/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { DeleteDialog } from "@/components/delete-dialog";
import { ProductImage } from "@/components/product/product-image";

import { deleteProductAction } from "./action";

export const dashboardProductsColumn: ColumnDef<Product & { category: Category }>[] = [
	{
		accessorKey: "images",
		header: "Image",
		cell: ({ row }) => <ProductImage src={row.original.images[0]} alt="image" transformation="thumbnail" className="size-20" size={80} />
	},
	{ accessorKey: "title", header: "Title", cell: ({ row }) => <p className="max-w-65 truncate">{row.original.title}</p> },
	{ id: "price", header: "Price", cell: ({ row }) => `Rs.${row.original.discountPrice ?? row.original.salePrice}` },
	{ id: "category", header: "Category", cell: ({ row }) => <span className="capitalize">{row.original.category.name}</span> },
	{ accessorKey: "stock", header: "Stock" },
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			return <Badge variant={status === "ARCHIVED" ? "destructive" : status === "PUBLISHED" ? "secondary" : "default"}>{status}</Badge>;
		}
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<div className="inline-flex items-center">
					<LinkButton href={`/dashboard/products/${row.original.id}`} variant="ghost" size="icon-sm">
						<EditIcon className="text-muted-foreground" />
					</LinkButton>
					<DeleteDialog
						title={`Delete Product?`}
						description={`Are you sure you want to delete. This action will permanently remove the ${row.original.title.toLowerCase()} and this action cannot be undone.`}
						onDelete={async () => {
							const { error } = await deleteProductAction(row.original.id);
							error ? toast.error(error) : toast.success("Product deleted successfuly");
						}}
					>
						<Button variant="ghost" size="icon-sm">
							<Trash2Icon className="text-destructive" />
						</Button>
					</DeleteDialog>
				</div>
			);
		}
	}
];

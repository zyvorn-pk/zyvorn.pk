"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import type { Categroy } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/delete-dialog";

import { deleteCategoryAction } from "./action";

export const dashboardCategoriesColumn: ColumnDef<Categroy & { _count: { products: number } }>[] = [
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "_count", header: "No. of products", cell: ({ row }) => `${row.original._count.products} products` },
	{ accessorKey: "createdAt", header: "Date", cell: ({ row }) => formatDate(row.original.createdAt) },
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<div className="inline-flex items-center">
					<Button variant="ghost" size="icon-sm" asChild>
						<Link href={`/dashboard/categories/${row.original.id}`}>
							<EditIcon className="text-muted-foreground" />
						</Link>
					</Button>
					<DeleteDialog
						title={`Delete ${row.original.name} Category?`}
						description={`Are you sure you want to delete. This action will permanently remove the ${row.original.name.toLowerCase()} category and all products within it. This action cannot be undone.`}
						onDelete={async () => {
							const { error } = await deleteCategoryAction(row.original.id);
							error ? toast.error(error) : toast.success("Category deleted successfuly");
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

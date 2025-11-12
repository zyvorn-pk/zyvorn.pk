import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { CategoryForm } from "@/components/dashboard/categories/form";

async function getCategoryById(categoryId: string) {
	"use cache";
	cacheLife("days");
	cacheTag(`category-${categoryId}`);

	const category = await db.categroy.findUnique({ where: { id: categoryId } });

	if (!category) return notFound();

	return category;
}

export default async function DashboardCategoryIdPage({ params }: PageProps<"/dashboard/categories/[categoryId]">) {
	const { categoryId } = await params;
	const category = await getCategoryById(categoryId);

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">Edit Category</h1>
			</div>
			<CategoryForm defaultValues={{ name: category.name, slug: category.slug }} categoryId={categoryId} />
		</>
	);
}

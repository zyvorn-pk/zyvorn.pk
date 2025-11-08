import { CategoryForm } from "@/components/dashboard/categories/form";

export default function NewDashboardCategoryPage() {
	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">New Category</h1>
			</div>
			<CategoryForm defaultValues={{ name: "", slug: "" }} />
		</>
	);
}

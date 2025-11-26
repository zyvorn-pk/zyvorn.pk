import { getCategories } from "@/lib/dal";
import { dashboardCategoriesColumn as columns } from "@/components/dashboard/categories/columns";
import { DashboardCategoriesTable } from "@/components/dashboard/categories/table";

export default async function DashboardCategoriesPage() {
	const data = await getCategories();
	return <DashboardCategoriesTable columns={columns} data={data} />;
}

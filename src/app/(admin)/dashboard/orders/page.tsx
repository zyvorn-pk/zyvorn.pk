import { getOrders } from "@/lib/dal";
import { dashboardOrdersColumn as columns } from "@/components/dashboard/orders/columns";
import { DashboardOrdersTable } from "@/components/dashboard/orders/table";

export default async function DashboardOrdersPage() {
	const data = await getOrders();
	return <DashboardOrdersTable columns={columns} data={data} />;
}

import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardOrdersPage() {
	return (
		<>
			<DashboardHeader currentPath="Orders" paths={[{ title: "Home", url: "/dashboard" }]} />
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">Orders</h1>
			</div>
		</>
	);
}

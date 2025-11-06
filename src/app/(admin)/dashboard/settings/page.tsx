import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardSettingsPage() {
	return (
		<>
			<DashboardHeader currentPath="Settings" paths={[{ title: "Home", url: "/dashboard" }]} />
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">Settings</h1>
			</div>
		</>
	);
}

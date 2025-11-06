import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardImagesPage() {
	return (
		<>
			<DashboardHeader currentPath="Images" paths={[{ title: "Home", url: "/dashboard" }]} />
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">Images</h1>
			</div>
		</>
	);
}

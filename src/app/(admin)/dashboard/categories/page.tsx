import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardCategoriesPage() {
	return (
		<>
			<DashboardHeader currentPath="Categories" paths={[{ title: "Home", url: "/dashboard" }]} />
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">Categories</h1>
				<Button>
					<PlusIcon />
					Add Category
				</Button>
			</div>
		</>
	);
}

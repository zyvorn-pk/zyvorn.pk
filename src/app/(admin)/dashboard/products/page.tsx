import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardProductsPage() {
	return (
		<>
			<DashboardHeader currentPath="Products" paths={[{ title: "Home", url: "/dashboard" }]} />
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">Products</h1>
				<Button>
					<PlusIcon />
					Add Product
				</Button>
			</div>
		</>
	);
}

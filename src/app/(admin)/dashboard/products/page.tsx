import { PlusIcon } from "lucide-react";

import { LinkButton } from "@/components/ui/button";

export default function DashboardProductsPage() {
	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-xl/9 font-semibold">Products</h1>
				<LinkButton href="/dashboard/products/new">
					<PlusIcon />
					New Product
				</LinkButton>
			</div>
		</>
	);
}

import { Suspense } from "react";

import { getCategories } from "@/lib/dal";
import { CategoriesProvider } from "@/context/categories-context";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/pages/dashboard/header";
import { DashboardSidebar } from "@/components/pages/dashboard/sidebar";

export default function Layout({ children }: LayoutProps<"/dashboard">) {
	return (
		<Suspense>
			<CategoriesLayout>{children}</CategoriesLayout>
		</Suspense>
	);
}

function CategoriesLayout({ children }: { children: React.ReactNode }) {
	const categoriesPromise = getCategories();
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset>
				<DashboardHeader />
				<div className="flex flex-1 flex-col">
					<CategoriesProvider dataPromise={categoriesPromise}>{children}</CategoriesProvider>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

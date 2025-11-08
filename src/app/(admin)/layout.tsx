import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function AdminLayout({ children }: LayoutProps<"/">) {
	return (
		<Suspense>
			<SidebarProvider>
				<DashboardSidebar />
				<SidebarInset>
					<DashboardHeader />
					<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</Suspense>
	);
}

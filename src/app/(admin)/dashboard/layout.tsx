import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset className="gap-4">{children}</SidebarInset>
		</SidebarProvider>
	);
}

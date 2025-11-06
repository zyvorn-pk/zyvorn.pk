import { Suspense } from "react";
import { forbidden, redirect } from "next/navigation";

import { getServerSession } from "@/lib/auth/get-session";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
	return (
		<Suspense>
			<DashboardAuthorizedLayout>{children}</DashboardAuthorizedLayout>
		</Suspense>
	);
}

async function DashboardAuthorizedLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession();

	if (!session) {
		return redirect("/login");
	}

	if (session.user.role !== "admin") {
		return forbidden();
	}

	return (
		<SidebarProvider>
			<DashboardSidebar user={session.user} />
			<SidebarInset className="gap-4 *:px-4">{children}</SidebarInset>
		</SidebarProvider>
	);
}

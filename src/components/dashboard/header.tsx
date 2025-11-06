import { Fragment } from "react";
import Link from "next/link";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
	currentPath: string;
	paths?: { title: string; url: string }[];
}

export function DashboardHeader({ currentPath, paths }: DashboardHeaderProps) {
	return (
		<header className="flex shrink-0 items-center gap-2 border-b px-4 py-2">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb>
				<BreadcrumbList>
					{paths?.map((item) => (
						<Fragment key={item.url}>
							<BreadcrumbLink className="capitalize" asChild>
								<Link href={item.url}>{item.title}</Link>
							</BreadcrumbLink>
							<BreadcrumbSeparator />
						</Fragment>
					))}
					<BreadcrumbItem>
						<BreadcrumbPage>{currentPath}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
}

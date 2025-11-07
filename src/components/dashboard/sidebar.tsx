"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SettingsIcon, ShoppingBagIcon, ShoppingCartIcon, TagIcon, UserIcon } from "lucide-react";

import { useSession } from "@/lib/auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
	const pathname = usePathname();
	const { setOpenMobile } = useSidebar();

	const { data } = useSession();

	const sidebarItems = [
		{
			label: "Admin",
			menu: [
				{ title: "Home", url: "/dashboard", icon: HomeIcon },
				{ title: "Orders", url: "/dashboard/orders", icon: ShoppingCartIcon }
			]
		},
		{
			label: "Store",
			menu: [
				{ title: "Products", url: "/dashboard/products", icon: ShoppingBagIcon },
				{ title: "Categories", url: "/dashboard/categories", icon: TagIcon }
			]
		},
		{
			label: "Account",
			menu: [
				{ title: "Profile", url: "/account", icon: UserIcon },
				{ title: "Settings", url: "/dashboard/settings", icon: SettingsIcon }
			]
		}
	];

	return (
		<Sidebar>
			<SidebarHeader>
				<h1 className="text-center text-2xl font-semibold uppercase">Admin Panel</h1>
			</SidebarHeader>
			<SidebarContent>
				{sidebarItems.map(({ label, menu }) => (
					<SidebarGroup key={label}>
						<SidebarGroupLabel>{label}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{menu.map(({ title, url, icon: Icon }) => (
									<SidebarMenuItem key={title}>
										<SidebarMenuButton
											className="data-[active=true]:text-primary-foreground data-[active=true]:bg-primary"
											isActive={pathname === url}
											asChild
										>
											<Link href={url} onClick={() => setOpenMobile(false)}>
												<Icon />
												<span>{title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				{data?.user && (
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg">
								<Avatar className="size-8">
									<AvatarImage src={data.user.image ?? undefined} alt={data.user.name} />
									<AvatarFallback>{`${data.user.name[0]}`}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{data.user.name}</span>
									<span className="text-muted-foreground truncate text-xs">{data.user.email}</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				)}
			</SidebarFooter>
		</Sidebar>
	);
}

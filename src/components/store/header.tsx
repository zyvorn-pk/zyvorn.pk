import Link from "next/link";
import { MenuIcon, ShoppingCartIcon } from "lucide-react";

import { getCategories } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetCloseButton,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import { AccountButton } from "@/components/account/account-button";

export async function StoreHeader() {
	const categories = await getCategories();
	const navLinks = [
		{ label: "Home", href: "/" },
		{ label: "Shop", href: "/collections/all" },
		...categories.map((category) => ({ label: category.name, href: `/collections/${category.slug}` }))
	];

	return (
		<header className="bg-background sticky top-0 z-50 w-full py-3" style={{ boxShadow: "0 1px 3px rgb(0 0 0 / 10%)" }}>
			<div className="container mx-auto flex items-center justify-between px-4">
				<Sheet>
					<SheetTrigger className="sm:hidden">
						<MenuIcon size={16} />
					</SheetTrigger>
					<SheetContent side="left" className="gap-0">
						<SheetHeader className="flex-row justify-between border-b px-5 py-3">
							<SheetTitle>Menu</SheetTitle>
							<SheetCloseButton />
							<SheetDescription hidden />
						</SheetHeader>
						<div className="grid">
							{navLinks.map(({ label, href }) => (
								<SheetClose key={label} asChild>
									<Link href={href} className="border-b px-5 py-3 text-sm">
										{label}
									</Link>
								</SheetClose>
							))}
						</div>
					</SheetContent>
				</Sheet>
				<Link href="/" className="text-xl/9 font-semibold">
					ZYVORN
				</Link>
				<nav className="hidden sm:flex sm:items-center sm:gap-4">
					{navLinks.map(({ label, href }) => (
						<Link href={href} key={label} className="decoration-gradient px-1 pb-px text-sm">
							{label}
						</Link>
					))}
				</nav>
				<div className="space-x-1">
					<AccountButton />
					<Button variant="link" size="icon-sm">
						<ShoppingCartIcon />
					</Button>
				</div>
			</div>
		</header>
	);
}

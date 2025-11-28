import { StoreFooter } from "@/components/store/footer";
import { StoreHeader } from "@/components/store/header";

export default function StoreLayout({ children }: LayoutProps<"/">) {
	return (
		<div className="flex min-h-dvh flex-col">
			<StoreHeader />
			<main className="flex flex-1 flex-col py-5 md:py-10">{children}</main>
			<StoreFooter />
		</div>
	);
}

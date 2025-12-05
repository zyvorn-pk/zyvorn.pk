import Link from "next/link";

export default function CheckoutLayout({ children }: LayoutProps<"/checkout">) {
	return (
		<main className="flex min-h-dvh flex-col">
			<header className="z-50 w-full border-b">
				<div className="flex justify-center px-4 py-3">
					<Link href="/" className="text-center text-xl/9 font-semibold" prefetch={false}>
						ZYVORN
					</Link>
				</div>
			</header>
			{children}
		</main>
	);
}

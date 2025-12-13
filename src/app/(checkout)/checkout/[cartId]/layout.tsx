import Link from "next/link";

export default function CheckoutLayout({ children }: LayoutProps<"/checkout/[cartId]">) {
	return (
		<main className="flex min-h-dvh flex-col" style={{ "--ring": "var(--blue)", "--primary": "var(--blue)" } as React.CSSProperties}>
			<header className="z-50 w-full border-b">
				<div className="flex justify-center px-4 py-3">
					<Link href="/" className="text-center text-xl/9 font-semibold">
						ZYVORN
					</Link>
				</div>
			</header>
			{children}
		</main>
	);
}

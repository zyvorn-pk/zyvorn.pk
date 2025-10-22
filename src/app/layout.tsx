import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const roboto = Roboto({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "E-commerce",
	description: "Full stack e-commerce application built with Next.js, TypeScript, and Tailwind CSS."
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" data-scroll-behavior="smooth">
			<body className="scroll-smooth antialiased" style={roboto.style}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

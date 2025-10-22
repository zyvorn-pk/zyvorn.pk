import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const outfit = Outfit({
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
			<body className="scroll-smooth antialiased" style={outfit.style}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

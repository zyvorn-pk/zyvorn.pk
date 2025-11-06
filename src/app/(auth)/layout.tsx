import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/auth/get-session";

export default async function AuthLayout({ children }: LayoutProps<"/">) {
	const session = await getServerSession();
	if (session) {
		return redirect("/account");
	}

	return (
		<main className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 px-4">
			<Link href="/">
				<h1 className="text-2xl font-bold">ZYVORN</h1>
			</Link>
			{children}
		</main>
	);
}

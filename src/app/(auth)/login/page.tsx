import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/server";
import { LoginForm } from "@/components/auth/login/form";

export default async function LoginPage() {
	const session = await getSession();
	if (session) {
		return redirect("/account");
	}
	return (
		<main className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 px-4">
			<Link href="/">
				<h1 className="text-2xl font-bold">ZYVORN</h1>
			</Link>
			<LoginForm />
		</main>
	);
}

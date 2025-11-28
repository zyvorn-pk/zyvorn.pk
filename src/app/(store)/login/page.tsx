import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { LoginForm } from "./form";

export default async function LoginPage() {
	const session = await getSession();
	if (session) return redirect("/account");

	return (
		<div className="container mx-auto flex flex-1 items-center justify-center px-4">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>Enter your email and we'll send you login link.</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}

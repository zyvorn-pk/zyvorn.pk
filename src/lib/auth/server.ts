import { headers } from "next/headers";
import { forbidden, redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function getSession() {
	return await auth.api.getSession({ headers: await headers() });
}

export async function getAdminSession() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) return redirect("/login");
	if (session.user.role !== "admin") return forbidden();
	return session;
}

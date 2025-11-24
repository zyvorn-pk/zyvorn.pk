"use client";

import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";

import { useSession } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export function AccountButton() {
	const router = useRouter();
	const { data, isPending } = useSession();

	return (
		<Button
			variant="link"
			size="icon-sm"
			onClick={() => {
				if (isPending) return;
				router.push(data ? "/account" : "/login");
			}}
		>
			<UserIcon />
		</Button>
	);
}

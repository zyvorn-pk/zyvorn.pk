"use client";

import { useEffect } from "react";
import { RefreshCcwIcon, TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function DashboardError({ error }: { error: Error & { digest?: string; reset: () => void } }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<TriangleAlertIcon />
				</EmptyMedia>
				<EmptyTitle>Something went wrong, Please try again!</EmptyTitle>
			</EmptyHeader>
			<EmptyContent>
				<Button onClick={() => window.location.reload()}>
					<RefreshCcwIcon />
					Refresh
				</Button>
			</EmptyContent>
		</Empty>
	);
}

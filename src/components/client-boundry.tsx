"use client";

import { useEffect, useState } from "react";

export function ClientBoundary({ children, fallback }: { children?: React.ReactNode; fallback?: React.ReactNode }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return <>{isClient ? children : fallback}</>;
}

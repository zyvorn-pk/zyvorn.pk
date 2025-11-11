"use client";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtools } from "@tanstack/react-form-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

import { getQueryClient } from "./get-query-client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<TanStackDevtools
				plugins={[
					{ name: "TanStack Form", render: <FormDevtools /> },
					{ name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> }
				]}
			/>
		</QueryClientProvider>
	);
}

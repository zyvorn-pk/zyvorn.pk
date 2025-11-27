import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreProductLoading() {
	return (
		<div className="container mx-auto grid gap-x-15 gap-y-7 px-4 md:grid-cols-2">
			<div className="space-y-2">
				<Skeleton className="aspect-square border" />
				<div className="grid grid-cols-4 gap-2">
					{Array.from({ length: 4 }).map((_, index) => (
						<Skeleton key={index} className="aspect-square border" />
					))}
				</div>
			</div>
			<div className="md:py-2">
				<Skeleton className="mb-1 h-7 md:h-9" />
				<Skeleton className="h-7 w-1/2 md:h-9" />
				<Skeleton className="my-4 h-5 w-1/2" />
				<Skeleton className="h-36" />
				<Skeleton className="mt-6 h-9 w-1/2" />
				<Separator className="my-6" />
				<Skeleton className="mb-6 h-12 w-40 rounded-full" />
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
					<Skeleton className="h-12 rounded-full" />
					<Skeleton className="h-12 rounded-full" />
				</div>
			</div>
		</div>
	);
}

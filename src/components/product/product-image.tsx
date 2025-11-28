import { Image } from "@imagekit/next";
import type { IKImageProps } from "@imagekit/next";

import { cn } from "@/lib/utils";

interface ProductImageProps extends Omit<IKImageProps, "transformation"> {
	size: number;
	transformation?: "listing" | "thumbnail" | "default";
}

export function ProductImage({ size, transformation = "default", className, ...props }: ProductImageProps) {
	return (
		<div className={cn("bg-muted flex shrink-0 overflow-hidden rounded-md border object-cover", className)}>
			<Image
				width={size}
				height={size}
				transformationPosition="path"
				className="aspect-square size-full"
				transformation={[{ named: transformation }]}
				{...props}
			/>
		</div>
	);
}

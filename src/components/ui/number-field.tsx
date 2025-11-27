"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { MinusIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface NumberFieldProps extends React.ComponentProps<"div"> {
	value?: number;
	maxValue?: number;
	disabled?: boolean;
	onValueChange?: (value: number) => void;
}

function NumberField({ value = 1, onValueChange, maxValue, disabled, className, ...props }: NumberFieldProps) {
	const [count, setCount] = useControllableState({ defaultProp: value, onChange: onValueChange });

	return (
		<div
			data-slot="number-field"
			className={cn(
				"inline-flex h-12 items-center justify-between overflow-hidden rounded-full border select-none *:h-full",
				disabled && "bg-muted opacity-50",
				className
			)}
			{...props}
		>
			<button
				type="button"
				className="cursor-pointer px-4"
				onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : prev))}
				disabled={disabled || count === 1}
			>
				<MinusIcon size={16} />
			</button>
			<p className="flex min-w-16 items-center justify-center font-medium">{count}</p>
			<button
				type="button"
				disabled={disabled || (!!maxValue && count >= maxValue)}
				className="cursor-pointer px-4"
				onClick={() => {
					if (maxValue && count >= maxValue) {
						toast.error(`Only ${maxValue} items availabe`);
					} else {
						setCount((prev) => prev + 1);
					}
				}}
			>
				<PlusIcon size={16} />
			</button>
		</div>
	);
}

export { NumberField };

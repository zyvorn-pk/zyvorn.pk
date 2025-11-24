import { Spinner } from "@/components/ui/spinner";

export default function LoginLoading() {
	return (
		<div className="flex flex-1 justify-center">
			<Spinner className="size-5" />
		</div>
	);
}

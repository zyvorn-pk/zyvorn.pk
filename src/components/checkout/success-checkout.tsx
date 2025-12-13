import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheckIcon } from "lucide-react";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function SuccessCheckout({ isLogin }: { isLogin?: boolean }) {
	const router = useRouter();
	const [open, setOpen] = useState(true);
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className="gap-5 py-8">
				<AlertDialogHeader className="items-center gap-5">
					<div className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-full border">
						<CircleCheckIcon className="size-10" />
					</div>
					<AlertDialogTitle className="text-2xl font-bold">Congratulations!</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription className="text-center">Your order has been placed successfully 🎉</AlertDialogDescription>
				<AlertDialogFooter className="gap-3">
					{isLogin && (
						<Button
							variant="outline"
							onClick={() => {
								router.push("/account");
								setOpen(false);
							}}
						>
							Go to account
						</Button>
					)}
					<Button
						onClick={() => {
							router.push("/");
							setOpen(false);
						}}
					>
						Continue Shopping
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

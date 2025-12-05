import { getSession } from "@/lib/auth/server";
import { CheckoutForm } from "@/components/checkout/form";

export default async function CheckoutPage() {
	const user = await getSession();

	return (
		<div
			className="grid flex-1 grid-cols-1 md:divide-x lg:grid-cols-2"
			style={{ "--ring": "var(--blue)", "--primary": "var(--blue)" } as React.CSSProperties}
		>
			<section className="flex justify-center lg:justify-end">
				<div className="w-full p-4 md:max-w-150 md:p-8">
					<CheckoutForm
						defaultValues={{
							email: user?.user.email ?? "",
							name: user?.user.name ?? "",
							phone: "",
							address: "",
							city: "",
							postalCode: "",
							province: "PUNJAB",
							country: "PAKISTAN",
							paymentMethod: "CASH_ON_DELIVERY"
						}}
					/>
				</div>
			</section>
			<section className="bg-muted/75 hidden justify-center md:*:max-w-120 lg:flex lg:justify-start">
				<div className="w-full p-4 md:max-w-120 md:p-8"></div>
			</section>
		</div>
	);
}

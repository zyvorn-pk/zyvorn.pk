"use client";

import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import type { COUNTRY, PAYMENT_METHOD, PROVINCE } from "@/lib/prisma/client";
import { cn } from "@/lib/utils";
import { AnimatedRadioGroup } from "@/components/ui/animated-radio-group";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FloatingLabelSelect } from "@/components/ui/floating-label-select";
import { SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { checkoutSchema, type CheckoutSchema } from "@/components/checkout/schema";

interface CheckoutFormProps extends React.ComponentProps<"form"> {
	provinces: string[];
	defaultValues: CheckoutSchema;
}

export function CheckoutForm({ className, defaultValues, provinces, ...props }: CheckoutFormProps) {
	const [isPending, startTransition] = useTransition();

	const form = useForm({
		defaultValues,
		validators: { onSubmit: checkoutSchema },
		onSubmit: ({ value }) => {
			startTransition(async () => {
				await new Promise((res) => setTimeout(res, 3000));
				toast.success("Checkout successful");
			});
		}
	});

	return (
		<form
			className={cn("space-y-6", className)}
			{...props}
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className="space-y-3">
				<h2 className="text-xl font-semibold">Contact</h2>
				<form.Field
					name="email"
					children={(field) => (
						<FloatingLabelInput
							name={field.name}
							placeholder="Email"
							value={field.state.value}
							onBlur={field.handleBlur}
							errors={field.state.meta.errors}
							onChange={(e) => field.handleChange(e.target.value)}
							isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
						/>
					)}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="text-xl font-semibold">Delivery</h2>
				<div className="grid gap-3 md:grid-cols-2">
					<form.Field
						name="name"
						children={(field) => (
							<FloatingLabelInput
								name={field.name}
								placeholder="Name"
								className="md:col-span-2"
								value={field.state.value}
								onBlur={field.handleBlur}
								errors={field.state.meta.errors}
								onChange={(e) => field.handleChange(e.target.value)}
								isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
							/>
						)}
					/>

					<form.Field
						name="country"
						children={(field) => (
							<FloatingLabelSelect
								placeholder="Country"
								name={field.name}
								value={field.state.value}
								onValueChange={(value) => field.handleChange(value as COUNTRY)}
							>
								<SelectItem value="PAKISTAN">Pakistan</SelectItem>
							</FloatingLabelSelect>
						)}
					/>

					<form.Field
						name="province"
						children={(field) => (
							<FloatingLabelSelect
								placeholder="Province"
								name={field.name}
								value={field.state.value}
								onValueChange={(value) => field.handleChange(value as PROVINCE)}
							>
								{provinces.map((province) => (
									<SelectItem key={province} value={province} className="capitalize">
										{province.toLowerCase().split("_").join(" ")}
									</SelectItem>
								))}
							</FloatingLabelSelect>
						)}
					/>

					<form.Field
						name="address"
						children={(field) => (
							<FloatingLabelInput
								name={field.name}
								placeholder="Address"
								className="md:col-span-2"
								value={field.state.value}
								onBlur={field.handleBlur}
								errors={field.state.meta.errors}
								onChange={(e) => field.handleChange(e.target.value)}
								isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
							/>
						)}
					/>

					<form.Field
						name="city"
						children={(field) => (
							<FloatingLabelInput
								name={field.name}
								placeholder="City"
								value={field.state.value}
								onBlur={field.handleBlur}
								errors={field.state.meta.errors}
								onChange={(e) => field.handleChange(e.target.value)}
								isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
							/>
						)}
					/>

					<form.Field
						name="postalCode"
						children={(field) => (
							<FloatingLabelInput
								name={field.name}
								type="number"
								placeholder="Postal Code"
								value={field.state.value}
								onBlur={field.handleBlur}
								errors={field.state.meta.errors}
								onChange={(e) => field.handleChange(e.target.value)}
								isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
							/>
						)}
					/>

					<form.Field
						name="phone"
						children={(field) => (
							<FloatingLabelInput
								type="tel"
								name={field.name}
								placeholder="Phone"
								className="md:col-span-2"
								value={field.state.value}
								onBlur={field.handleBlur}
								errors={field.state.meta.errors}
								onChange={(e) => field.handleChange(e.target.value)}
								isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
							/>
						)}
					/>
				</div>
			</div>

			<div className="space-y-3">
				<h2 className="text-xl font-semibold">Shipping Method</h2>
				<div className="border-blue bg-blue/5 flex items-center justify-between rounded-md border p-3 text-sm">
					<p className="font-medium">Standard Shipping</p>
					<p>FREE</p>
				</div>
			</div>

			<div className="space-y-3">
				<h2 className="text-xl font-semibold">Payment Method</h2>
				<form.Field
					name="paymentMethod"
					children={(field) => (
						<AnimatedRadioGroup
							value={field.state.value}
							errors={field.state.meta.errors}
							onValueChange={(value) => field.handleChange(value as PAYMENT_METHOD)}
							isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
							items={[
								{ label: "Cash on Delivery", value: "CASH_ON_DELIVERY" },
								{
									label: "Bank Deposit",
									value: "BANK_TRANSFER",
									description: (
										<>
											<p>Account Title: AHMAD IJAZ</p>
											<p>Bank: Bank Alfalah</p>
											<p>Account # 03651008886488</p>
											<p>IBAN # PK89ALFA0365001008886488</p>
											<br />
											<p>WhatsApp Deposit Slip / Transfer Message with Your Order Number to us 0370-7525627</p>
										</>
									)
								}
							]}
						/>
					)}
				/>
			</div>

			<Button type="submit" size="lg" className="text-base" disabled={isPending}>
				{isPending ? <Spinner /> : "Complete Order"}
			</Button>
		</form>
	);
}

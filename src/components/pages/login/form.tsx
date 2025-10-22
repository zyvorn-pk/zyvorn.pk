"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema } from "@/components/pages/login/schema";

export function LoginForm() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false
		},
		validators: {
			onSubmit: loginSchema
		},
		onSubmit: ({ value }) => {
			startTransition(async () => {
				await authClient.signIn.email(value, {
					onSuccess: () => {
						router.push("/");
					},
					onError: ({ error }) => {
						toast.error(error.message);
					}
				});
			});
		}
	});

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to Admin Dashboard</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup className="gap-4">
						<form.Field
							name="email"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field className="gap-1">
										<FieldLabel aria-invalid={isInvalid}>Email</FieldLabel>
										<InputGroup>
											<InputGroupInput
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
											/>
											<InputGroupAddon>
												<MailIcon />
											</InputGroupAddon>
										</InputGroup>
										{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
						<form.Field
							name="password"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field className="gap-1">
										<FieldLabel>Password</FieldLabel>
										<InputGroup>
											<InputGroupInput
												type="password"
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
											/>
											<InputGroupAddon>
												<LockIcon />
											</InputGroupAddon>
										</InputGroup>
										{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
						<form.Field
							name="rememberMe"
							children={(field) => (
								<Field orientation="horizontal" className="gap-2">
									<Checkbox id="rememberMe" checked={field.state.value} onCheckedChange={(value) => field.handleChange(!!value)} />
									<FieldLabel htmlFor="rememberMe">Remember me</FieldLabel>
								</Field>
							)}
						/>
						<Button type="submit" disabled={isPending}>
							{isPending ? <Spinner /> : "Login"}
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}

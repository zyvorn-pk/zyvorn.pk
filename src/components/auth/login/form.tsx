"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { MailIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = z.object({
	email: z.email("Invalid email address")
});

export function LoginForm() {
	const [loading, setLoading] = useState(false);
	const [isPending, startTransition] = useTransition();

	const form = useForm({
		defaultValues: { email: "" },
		validators: { onSubmit: loginSchema },
		onSubmit: ({ value: { email } }) => {
			startTransition(async () => {
				await signIn.magicLink(
					{ email, name: email.split("@")[0], callbackURL: "/account" },
					{
						onSuccess: () => {
							toast.success(`Email with the link has been sent`);
						},
						onError: ({ error }) => {
							toast.error(error.message || "Something went wrong");
						}
					}
				);
			});
		}
	});

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>Enter your email and we'll send you login link.</CardDescription>
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
												placeholder="someone@example.com"
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
						<Field orientation="vertical">
							<Button type="submit" disabled={isPending}>
								{isPending ? <Spinner /> : "Send Link"}
							</Button>
							<div className="flex items-center gap-2">
								<div className="w-full border-t" />
								<div className="text-muted-foreground text-sm">or</div>
								<div className="w-full border-t" />
							</div>
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={async () =>
									await signIn.social(
										{ provider: "google", callbackURL: "/account" },
										{
											onRequest: () => setLoading(true),
											onResponse: () => setLoading(false),
											onError: () => {
												toast.error("Something went wrong, please try again");
											}
										}
									)
								}
							>
								{loading ? (
									<Spinner />
								) : (
									<>
										<svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
											<path
												fill="#4285F4"
												d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
											/>
											<path
												fill="#34A853"
												d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
											/>
											<path
												fill="#FBBC05"
												d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
											/>
											<path
												fill="#EB4335"
												d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
											/>
										</svg>
										<span>Continue with Google</span>
									</>
								)}
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}

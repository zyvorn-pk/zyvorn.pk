"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { formatSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { categorySchema, type CategorySchema } from "@/components/dashboard/categories/schema";

import { upsertCategoryAction } from "./action";

export function CategoryForm({ defaultValues, categoryId }: { defaultValues: CategorySchema; categoryId?: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm({
		defaultValues,
		validators: { onSubmit: categorySchema },
		onSubmit: ({ value }) => {
			startTransition(async () => {
				const { error } = await upsertCategoryAction(value, categoryId);
				if (error) {
					toast.error(error);
					return;
				}
				toast.success(categoryId ? "Category updated successfuly" : "New category has been created");
				router.push("/dashboard/categories");
			});
		}
	});

	return (
		<form
			className="grid w-full gap-4 md:grid-cols-3"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="name"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Name</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								aria-invalid={isInvalid}
								onChange={(e) => {
									field.handleChange(e.target.value);
									form.setFieldValue("slug", formatSlug(e.target.value));
								}}
							/>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>
			<div className="md:col-span-3">
				<Button type="submit" className="w-fit" disabled={isPending}>
					{isPending && <Spinner />}
					{categoryId ? "Update" : "Create"}
				</Button>
			</div>
		</form>
	);
}

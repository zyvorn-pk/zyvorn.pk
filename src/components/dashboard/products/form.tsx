"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import type { Category, PRODUCT_STATUS } from "@/lib/prisma/client";
import { formatSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { TextEditor } from "@/components/ui/text-editor";
import { productSchema, type ProductSchema } from "@/components/dashboard/products/schema";
import { ImageUpload } from "@/components/image-upload";

import { upserProductAction } from "./action";

interface ProductFormProps {
	defaultValues: ProductSchema;
	categories: Category[];
	productId?: string;
}

export function ProductForm({ defaultValues, productId, categories }: ProductFormProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [imagePending, imageTransition] = useTransition();

	const form = useForm({
		defaultValues,
		validators: { onSubmit: productSchema },
		onSubmit: ({ value }) => {
			startTransition(async () => {
				const { error } = await upserProductAction(value, productId);
				if (error) {
					toast.error(error);
					return;
				}
				form.reset();
				router.push("/dashboard/products");
				toast.success(productId ? "Product updated successfuly" : "New Product has been created");
			});
		}
	});

	return (
		<form
			className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="title"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Title</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								aria-invalid={isInvalid}
								onChange={(e) => {
									field.handleChange(e.target.value);
									!form.state.fieldMeta.slug.isBlurred && form.setFieldValue("slug", formatSlug(e.target.value));
								}}
							/>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="slug"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Slug</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								aria-invalid={isInvalid}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="categoryId"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Category</FieldLabel>
							<Select name={field.name} value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
								<SelectTrigger>
									<SelectValue id={field.name} aria-invalid={isInvalid} />
								</SelectTrigger>
								<SelectContent>
									{categories.map(({ id, name }) => (
										<SelectItem key={id} value={id}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="costPrice"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Cost Price</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText>Rs.</InputGroupText>
								</InputGroupAddon>
								<InputGroupInput
									type="number"
									id={field.name}
									name={field.name}
									className="px-0.5!"
									value={field.state.value || ""}
									onBlur={field.handleBlur}
									aria-invalid={isInvalid}
									onChange={(e) => field.handleChange(Number(e.target.value))}
								/>
							</InputGroup>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="salePrice"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Sale Price</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText>Rs.</InputGroupText>
								</InputGroupAddon>
								<InputGroupInput
									type="number"
									id={field.name}
									name={field.name}
									className="px-0.5!"
									value={field.state.value || ""}
									onBlur={field.handleBlur}
									aria-invalid={isInvalid}
									onChange={(e) => field.handleChange(Number(e.target.value))}
								/>
							</InputGroup>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="discountPrice"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Discount Price</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<InputGroupText>Rs.</InputGroupText>
								</InputGroupAddon>
								<InputGroupInput
									type="number"
									id={field.name}
									name={field.name}
									className="px-0.5!"
									value={field.state.value || ""}
									onBlur={field.handleBlur}
									aria-invalid={isInvalid}
									onChange={(e) => field.handleChange(Number(e.target.value))}
								/>
							</InputGroup>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="images"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1 lg:col-span-2 xl:col-span-3">
							<FieldLabel htmlFor={field.name}>Images</FieldLabel>
							<ImageUpload
								id={field.name}
								name={field.name}
								className="*:size-30"
								transition={imageTransition}
								pushValue={field.pushValue}
								removeValue={field.removeValue}
								uploadOptions={{
									folder: "/products",
									transformation: {
										pre: "n-default",
										post: [
											{ type: "transformation", value: "n-listing" },
											{ type: "transformation", value: "n-thumbnail" }
										]
									}
								}}
							/>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="description"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1 lg:col-span-2 xl:col-span-3">
							<FieldLabel>Description</FieldLabel>
							<TextEditor value={field.state.value} onChange={(value) => field.handleChange(value)} />
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="stock"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Stock</FieldLabel>
							<Input
								type="number"
								id={field.name}
								name={field.name}
								value={field.state.value || ""}
								onBlur={field.handleBlur}
								aria-invalid={isInvalid}
								onChange={(e) => field.handleChange(Number(e.target.value))}
							/>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<form.Field
				name="status"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field className="gap-1">
							<FieldLabel htmlFor={field.name}>Status</FieldLabel>
							<Select name={field.name} value={field.state.value} onValueChange={(value) => field.handleChange(value as PRODUCT_STATUS)}>
								<SelectTrigger>
									<SelectValue id={field.name} aria-invalid={isInvalid} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="PUBLISHED">Published</SelectItem>
									<SelectItem value="DRAFT">Draft</SelectItem>
									<SelectItem value="ARCHIVED">Archived</SelectItem>
								</SelectContent>
							</Select>
							{isInvalid && <FieldError className="text-sm" errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			/>

			<div className="lg:col-span-2 xl:col-span-3">
				<Button type="submit" className="w-fit" disabled={imagePending || isPending}>
					{(isPending || imagePending) && <Spinner />}
					{imagePending ? "Uploading" : productId ? "Update" : "Create"}
				</Button>
			</div>
		</form>
	);
}

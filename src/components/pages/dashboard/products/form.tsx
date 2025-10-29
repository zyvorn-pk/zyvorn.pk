"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, PlusIcon, Trash2Icon, UploadIcon, XIcon } from "lucide-react";
import { useFieldArray, useForm, type DefaultValues } from "react-hook-form";
import generateSlug from "slugify";
import { toast } from "sonner";

import { useCategories } from "@/context/categories-context";
import { Button, LoaderButton } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadTrigger
} from "@/components/ui/file-upload";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { addProductAction } from "./action";
import { productSchema, type ProductSchema } from "./schema";

type ProductFormProps = {
	defaultValues: DefaultValues<ProductSchema>;
};

export function ProductForm({ defaultValues }: ProductFormProps) {
	const router = useRouter();
	const categories = useCategories();

	const [isPending, startTransition] = useTransition();

	const form = useForm<ProductSchema>({
		resolver: zodResolver(productSchema),
		defaultValues
	});

	const {
		fields: options,
		append: appendOption,
		remove: removeOption
	} = useFieldArray({
		control: form.control,
		name: "variations"
	});

	function onSubmit(values: ProductSchema) {
		startTransition(async () => {
			const response = await addProductAction(values);
			if (response.error) {
				toast.error("Something went wrong");
				return;
			}
			router.push("/dashboard/products");
		});
	}

	return (
		<Form {...form}>
			<form className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field: { value, onChange, ...field } }) => (
						<FormItem>
							<FormLabel>Product Title</FormLabel>
							<FormControl>
								<Input
									onChange={(e) => {
										onChange(e.target.value);
										form.setValue("slug", generateSlug(e.target.value, { lower: true, trim: true }));
									}}
									value={value}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="slug"
					render={({ field: { value } }) => (
						<FormItem>
							<FormLabel>Product Slug</FormLabel>
							<FormControl>
								<Input value={value} readOnly />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="originalPrice"
					render={({ field: { onChange, value, ...field } }) => (
						<FormItem>
							<FormLabel>Original Price</FormLabel>
							<FormControl>
								<Input onChange={(e) => onChange(Number(e.target.value))} type="number" value={value || ""} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="discountedPrice"
					render={({ field: { onChange, value, ...field } }) => (
						<FormItem>
							<FormLabel>Discounted Price</FormLabel>
							<FormControl>
								<Input onChange={(e) => onChange(Number(e.target.value))} type="number" value={value || ""} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="categoryId"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Product Category</FormLabel>
							<Select value={value} onValueChange={onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select product category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories.map(({ id, name }) => (
										<SelectItem key={id} value={id} className="capitalize">
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="shortDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Short Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="longDescription"
					render={({ field }) => (
						<FormItem className="md:col-span-2">
							<FormLabel>Long Description</FormLabel>
							<FormControl>
								<Textarea rows={4} className="min-h-48 resize-none" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="images"
					render={({ field }) => (
						<FormItem className="md:col-span-2">
							<FormLabel>Product Images</FormLabel>
							<FormControl>
								<FileUpload
									accept="image/*"
									maxSize={5 * 1024 * 1024}
									onFileReject={(_, message) => form.setError("images", { message })}
									onValueChange={field.onChange}
									value={field.value}
									multiple
								>
									{field.value.length > 0 ? (
										<div className="flex w-full flex-col gap-3 p-4">
											<div className="flex items-center justify-between gap-2">
												<h3 className="truncate text-sm font-medium">Files ({field.value.length})</h3>
												<FileUploadTrigger asChild>
													<Button size="sm" variant="outline">
														<UploadIcon aria-hidden="true" className="-ms-0.5 size-3.5 opacity-60" />
														Add more
													</Button>
												</FileUploadTrigger>
											</div>
											<FileUploadList className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
												{field.value.map((file, index) => (
													<FileUploadItem className="relative" key={index} value={file}>
														<FileUploadItemPreview />
														<FileUploadItemDelete asChild>
															<Button
																className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
																size="icon"
															>
																<XIcon className="size-3.5" />
															</Button>
														</FileUploadItemDelete>
													</FileUploadItem>
												))}
											</FileUploadList>
										</div>
									) : (
										<FileUploadDropzone>
											<div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border">
												<ImageIcon className="size-4 opacity-60" />
											</div>
											<p className="mb-1.5 text-sm font-medium">Drop your product images here</p>
											<FileUploadTrigger asChild>
												<Button className="mt-2" variant="outline">
													<UploadIcon aria-hidden="true" className="-ms-1 opacity-60" />
													Select images
												</Button>
											</FileUploadTrigger>
										</FileUploadDropzone>
									)}
								</FileUpload>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Card className="py-4 md:col-span-2 md:py-6">
					<CardHeader className="grid grid-cols-2 grid-rows-1 items-center px-2 md:px-6">
						<CardTitle>Color Variation</CardTitle>
						<Button className="ml-auto w-fit" onClick={() => appendOption({ name: "", color: "#000000", stock: 0 })} variant="outline">
							<PlusIcon />
							Add Option
						</Button>
					</CardHeader>

					<CardContent className="px-2 md:px-6">
						<FormField
							control={form.control}
							name="variations"
							render={() => (
								<FormItem>
									{options.map((option, optionIndex) => (
										<div
											key={option.id}
											className="grid grid-cols-[1fr_1fr_40px_40px] items-start gap-2 md:grid-cols-[1fr_1fr_1fr_40px] md:gap-4"
										>
											<FormField
												control={form.control}
												name={`variations.${optionIndex}.name`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Name</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`variations.${optionIndex}.stock`}
												render={({ field: { onChange, value, ...field } }) => (
													<FormItem>
														<FormLabel>Stock</FormLabel>
														<FormControl>
															<Input onChange={(e) => onChange(Number(e.target.value))} type="number" value={value || ""} {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`variations.${optionIndex}.color`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Color</FormLabel>
														<FormControl>
															<Input type="color" className="overflow-hidden border-none p-0" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<Button
												size="icon"
												className="mt-5.5"
												variant="destructive"
												onClick={() => removeOption(optionIndex)}
												disabled={options.length === 1}
											>
												<Trash2Icon />
											</Button>
										</div>
									))}
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					{form.formState.errors.variations && (
						<CardFooter className="px-2 md:px-6">
							<span className="text-destructive text-sm">{form.formState.errors.variations?.root?.message}</span>
						</CardFooter>
					)}
				</Card>

				<LoaderButton type="submit" className="md:w-fit" loading={isPending} />
			</form>
		</Form>
	);
}

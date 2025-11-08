import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
	return format(date, "MMM dd, yyyy");
}

export function formatSlug(value: string) {
	return slugify(value, { lower: true, trim: true });
}

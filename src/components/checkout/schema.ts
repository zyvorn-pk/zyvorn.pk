import { z } from "zod";

import { COUNTRY, PAYMENT_METHOD, PROVINCE } from "@/lib/prisma/client";

export const checkoutSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	email: z.email("Invalid email address"),
	phone: z
		.string()
		.min(10, "Phone number must have atleast 10 characters")
		.regex(/^[0-9]+$/, "Phone number can only contain numbers"),
	address: z.string().min(3, "Address must be at least 3 characters long"),
	city: z.string().min(3, "City must be at least 3 characters long"),
	postalCode: z.string().min(3, "Zip code must be at least 3 characters long").or(z.literal("")),
	province: z.enum([PROVINCE.PUNJAB, PROVINCE.SINDH, PROVINCE.BALOCHISTAN, PROVINCE.KHYBER_PAKHTUNKHWA, PROVINCE.AZAD_KASHMIR]),
	country: z.enum([COUNTRY.PAKISTAN]),
	paymentMethod: z.enum([PAYMENT_METHOD.BANK_TRANSFER, PAYMENT_METHOD.CASH_ON_DELIVERY])
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

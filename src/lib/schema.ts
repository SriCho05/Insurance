import { z } from 'zod';

export const leadFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  age: z.coerce.number().int().min(18, "You must be at least 18 years old.").max(100, "Please enter a valid age."),
  contactNumber: z.string().regex(/^(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Please enter a valid Indian phone number (e.g., +91 98765 43210)."),
  emailAddress: z.string().email("Please enter a valid email address.").optional().or(z.literal('')),
  city: z.string().optional(),
  selectedProduct: z.string(),
});

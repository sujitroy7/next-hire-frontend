import z from "zod";

export const addressSchema = z.object({
  addressLine1: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
});

export type AddressSchema = z.infer<typeof addressSchema>;

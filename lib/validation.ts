import { z } from "zod";

// Family / trusted-contact intake. Kept minimal and respectful — no clinical data.
export const familyIntakeSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  relationship: z
    .string()
    .trim()
    .max(80, "Keep this under 80 characters.")
    .optional()
    .or(z.literal("")),
  county: z.string().trim().max(80).optional().or(z.literal("")),
  contactPref: z.enum(["email", "phone"]).default("email"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about how we can help (10+ characters).")
    .max(2000, "Please keep your message under 2000 characters."),
  // Honeypot — real users leave this empty; bots fill it.
  company: z.string().max(0).optional().or(z.literal("")),
  consent: z
    .union([z.literal(true), z.literal("true"), z.literal("on")])
    .transform(() => true)
    .refine((v) => v === true, "Please confirm you understand SUAS is not emergency care."),
});

export type FamilyIntake = z.infer<typeof familyIntakeSchema>;

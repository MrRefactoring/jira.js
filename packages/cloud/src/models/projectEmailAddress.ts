import { z } from 'zod';

/** A project's sender email address. */
export const ProjectEmailAddressSchema = z.object({
  /** The email address. */
  emailAddress: z.string().optional(),
  /** When using a custom domain, the status of the email address. */
  emailAddressStatus: z.array(z.string()).optional(),
});

export type ProjectEmailAddress = z.infer<typeof ProjectEmailAddressSchema>;

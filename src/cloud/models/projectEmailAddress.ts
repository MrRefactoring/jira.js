import { z } from 'zod';
import { apiObject } from '#/core';
/** A project's sender email address. */

export const ProjectEmailAddressSchema = apiObject({
  /** The email address. */
  emailAddress: z.string().optional(),
  /** When using a custom domain, the status of the email address. */
  emailAddressStatus: z.array(z.string()).optional(),
});

export type ProjectEmailAddress = z.infer<typeof ProjectEmailAddressSchema>;

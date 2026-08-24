import { z } from 'zod';

export const ValidateUserAnonymizationSchema = z.object({
  /** Parameter used to include parts of the response. */
  expand: z.string().optional(),
  /** The key of the user to validate anonymization for. */
  userKey: z.string().optional(),
});

export type ValidateUserAnonymization = z.input<typeof ValidateUserAnonymizationSchema>;

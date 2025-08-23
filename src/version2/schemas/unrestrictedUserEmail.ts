import { z } from 'zod';

export const UnrestrictedUserEmailSchema = z.object({
  /** The accountId of the user */
  accountId: z.string().optional(),
  /** The email of the user */
  email: z.string().optional(),
});

export type UnrestrictedUserEmail = z.infer<typeof UnrestrictedUserEmailSchema>;

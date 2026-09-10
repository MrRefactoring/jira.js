import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const DeactivateUserSchema = z.object({
  /** The ID of the user */
  accountId: AccountIdSchema,
  message: z.string().optional(),
});

export type DeactivateUser = z.input<typeof DeactivateUserSchema>;

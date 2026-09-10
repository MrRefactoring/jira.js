import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const ActivateUserSchema = z.object({
  /** The unique identifier of the user to activate. */
  accountId: AccountIdSchema,
});

export type ActivateUser = z.input<typeof ActivateUserSchema>;

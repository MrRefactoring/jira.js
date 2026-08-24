import { z } from 'zod';
import { AccountIdSchema } from '../models';
import { EmailSchema } from '../models';

export const SetEmailSchema = z.object({
  /** The ID of the user */
  accountId: AccountIdSchema,
  email: EmailSchema,
});

export type SetEmail = z.input<typeof SetEmailSchema>;

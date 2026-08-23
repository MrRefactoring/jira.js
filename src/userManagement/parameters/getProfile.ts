import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const GetProfileSchema = z.object({
  /** The ID of the user */
  accountId: AccountIdSchema,
});

export type GetProfile = z.input<typeof GetProfileSchema>;

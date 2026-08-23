import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const GetApiTokensSchema = z.object({
  /** The ID of the user */
  accountId: AccountIdSchema,
});

export type GetApiTokens = z.input<typeof GetApiTokensSchema>;

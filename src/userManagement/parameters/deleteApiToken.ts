import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const DeleteApiTokenSchema = z.object({
  /** The ID of the user */
  accountId: AccountIdSchema,
  /** The ID of the API token */
  tokenId: z.string(),
});

export type DeleteApiToken = z.input<typeof DeleteApiTokenSchema>;

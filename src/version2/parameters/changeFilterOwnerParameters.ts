import { z } from 'zod';

export const ChangeFilterOwnerParametersSchema = z.object({
  /** The ID of the filter to update. */
  id: z.number().int(),
  /** The account ID of the new owner. */
  accountId: z.string(),
});

export type ChangeFilterOwnerParameters = z.infer<typeof ChangeFilterOwnerParametersSchema>;

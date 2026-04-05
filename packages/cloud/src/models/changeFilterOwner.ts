import { z } from 'zod';

/** The account ID of the new owner. */
export const ChangeFilterOwnerSchema = z.object({
  /** The account ID of the new owner. */
  accountId: z.string(),
});

export type ChangeFilterOwner = z.infer<typeof ChangeFilterOwnerSchema>;

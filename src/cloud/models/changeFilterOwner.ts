import { z } from 'zod';
import { apiObject } from '#/core';
/** The account ID of the new owner. */

export const ChangeFilterOwnerSchema = apiObject({
  /** The account ID of the new owner. */
  accountId: z.string(),
});

export type ChangeFilterOwner = z.infer<typeof ChangeFilterOwnerSchema>;

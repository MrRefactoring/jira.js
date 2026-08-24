import { z } from 'zod';
/** A unique account identifier */

export const AccountIdSchema = z.string();

export type AccountId = z.infer<typeof AccountIdSchema>;

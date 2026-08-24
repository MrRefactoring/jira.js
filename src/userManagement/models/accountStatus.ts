import type { z } from 'zod';
import { openEnum } from '#/core';
/** The lifecycle status of the account */

export const AccountStatusSchema = openEnum(['active', 'inactive', 'closed']);

export type AccountStatus = z.infer<typeof AccountStatusSchema>;

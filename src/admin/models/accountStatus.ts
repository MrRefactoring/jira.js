import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The lifecycle status of the account.*
 *
 * - `active` - The account is active and can be used.*
 * - `inactive` - The account is inactive and doesn't have access to any resources.*
 * - `closed` - The account is closed and can't be used.
 */

export const AccountStatusSchema = openEnum(['active', 'inactive', 'closed']);

export type AccountStatus = z.infer<typeof AccountStatusSchema>;

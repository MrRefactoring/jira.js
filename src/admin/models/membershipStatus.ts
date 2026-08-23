import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The membership status is the status of the user account in the organization.*
 *
 * - `active` - the account has an active membership for one or more directories within the organization.*
 * - `suspended` - the account is suspended in all directories within the organization, to which the requestor has
 *   permission to access.*
 * - `no_membership` - the account is in none of the organization’s directories.
 */

export const MembershipStatusSchema = openEnum(['active', 'suspended', 'no_membership']);

export type MembershipStatus = z.infer<typeof MembershipStatusSchema>;

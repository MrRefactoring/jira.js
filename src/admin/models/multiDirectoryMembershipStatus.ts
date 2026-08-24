import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The user's membership status in the directory mapped to this resource.*
 *
 * - `active` - The user has an active membership in the directory.*
 * - `suspended` - The user is suspended in the directory.*
 * - `no_membership` - The user has no membership in the directory.
 */

export const MultiDirectoryMembershipStatusSchema = openEnum(['active', 'suspended', 'no_membership']);

export type MultiDirectoryMembershipStatus = z.infer<typeof MultiDirectoryMembershipStatusSchema>;

import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The status for the user account. This status is a composite of `accountStatus` and `membershipStatus`.*
 *
 * - `active` - `accountStatus` is `active` and `membershipStatus` is `active`.*
 * - `suspended` - `accountStatus` is `active` and `membershipStatus` is `suspended`.*
 * - `not_invited` - `accountStatus` is `active` and `membershipStatus` is `no_membership`.*
 * - `deactivated` - `accountStatus` is `inactive`.*
 * - `for_deletion` - Indicates whether or not a managed account is scheduled for deletion.
 */

export const StatusSchema = openEnum(['active', 'suspended', 'not_invited', 'deactivated', 'for_deletion']);

export type Status = z.infer<typeof StatusSchema>;

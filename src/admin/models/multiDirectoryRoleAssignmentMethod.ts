import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The method by which a role was assigned.*
 *
 * - `inferred` - The role was inferred.*
 * - `direct` - The role was assigned directly to the user.*
 * - `group_direct` - The role was assigned through direct group membership.
 */

export const MultiDirectoryRoleAssignmentMethodSchema = openEnum(['inferred', 'direct', 'group_direct']);

export type MultiDirectoryRoleAssignmentMethod = z.infer<typeof MultiDirectoryRoleAssignmentMethodSchema>;

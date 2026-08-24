import { z } from 'zod';
import { apiObject } from '#/core';
import { ResourceIdSchema } from './resourceId';
import { ResourceOwnerSchema } from './resourceOwner';
import { MultiDirectoryRoleAssignmentSchema } from './multiDirectoryRoleAssignment';
import { MultiDirectoryMembershipStatusSchema } from './multiDirectoryMembershipStatus';
/** The role assignment for the user. */

export const MultiDirectoryUserRoleAssignmentSchema = apiObject({
  resourceId: ResourceIdSchema.optional(),
  resourceOwner: ResourceOwnerSchema.optional(),
  /** Deprecated. Use `roleAssignments` instead. The roles assigned to the resource ID. */
  roles: z.array(z.string()).optional(),
  /** Roles grouped with their role assignment methods. This field supersedes `roles`. */
  roleAssignments: z.array(MultiDirectoryRoleAssignmentSchema).optional(),
  /**
   * The directory ID mapped to this resource. This field will be null for platform roles (such as org-admin or
   * site-admin) that are not associated with a specific directory.
   */
  directoryId: z.string().nullish(),
  /**
   * The user's membership status in the directory mapped to this resource. This field will be null for platform roles
   * (such as org-admin or site-admin) that are not associated with a specific directory.
   */
  userDirectoryStatus: MultiDirectoryMembershipStatusSchema.nullish(),
});

export type MultiDirectoryUserRoleAssignment = z.infer<typeof MultiDirectoryUserRoleAssignmentSchema>;

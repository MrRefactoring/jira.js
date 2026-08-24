import { z } from 'zod';
import { apiObject } from '#/core';
import { ResourceIdSchema } from './resourceId';
import { ResourceOwnerSchema } from './resourceOwner';
import { RoleIdsSchema } from './roleIds';
/** The role assignment for the group. */

export const MultiDirectoryGroupRoleAssignmentSchema = apiObject({
  resourceId: ResourceIdSchema.optional(),
  resourceOwner: ResourceOwnerSchema.optional(),
  /** Indicates which role is granted by default for the resource ID. */
  defaultRole: z.string().nullish(),
  roles: RoleIdsSchema.optional(),
});

export type MultiDirectoryGroupRoleAssignment = z.infer<typeof MultiDirectoryGroupRoleAssignmentSchema>;

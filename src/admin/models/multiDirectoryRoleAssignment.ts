import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleIdSchema } from './roleId';
import { MultiDirectoryRoleAssignmentMethodSchema } from './multiDirectoryRoleAssignmentMethod';
/** A role assigned on a resource, including how the role was assigned. */

export const MultiDirectoryRoleAssignmentSchema = apiObject({
  role: RoleIdSchema.optional(),
  /** The methods by which this role was assigned to the user for the resource. */
  roleAssignmentMethods: z.array(MultiDirectoryRoleAssignmentMethodSchema).optional(),
});

export type MultiDirectoryRoleAssignment = z.infer<typeof MultiDirectoryRoleAssignmentSchema>;

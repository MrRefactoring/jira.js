import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleAssociationSchema } from './roleAssociation';

export const GroupRoleAssignmentInputSchema = apiObject({
  roleAssociations: z.array(RoleAssociationSchema),
});

export type GroupRoleAssignmentInput = z.infer<typeof GroupRoleAssignmentInputSchema>;

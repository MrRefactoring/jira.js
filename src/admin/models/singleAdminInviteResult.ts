import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleAssignmentResultSchema } from './roleAssignmentResult';
import { GroupAssignmentResultSchema } from './groupAssignmentResult';

export const SingleAdminInviteResultSchema = apiObject({
  /** List of role assignment results for the user */
  roleAssignmentResult: z.array(RoleAssignmentResultSchema).optional(),
  /** List of group assignment results for the user */
  groupAssignmentResult: z.array(GroupAssignmentResultSchema).optional(),
});

export type SingleAdminInviteResult = z.infer<typeof SingleAdminInviteResultSchema>;

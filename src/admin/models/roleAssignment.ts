import { z } from 'zod';
import { apiObject } from '#/core';

export const RoleAssignmentSchema = apiObject({
  resourceId: z.string().optional(),
  principalId: z.string().optional(),
  roleId: z.string().optional(),
});

export type RoleAssignment = z.infer<typeof RoleAssignmentSchema>;

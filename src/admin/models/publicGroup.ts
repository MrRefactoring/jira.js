import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleAssignmentSchema } from './roleAssignment';

export const PublicGroupSchema = apiObject({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  roleAssignments: z.array(RoleAssignmentSchema).optional(),
});

export type PublicGroup = z.infer<typeof PublicGroupSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleActorSchema } from './roleActor';

export const ProjectRoleSchema = apiObject({
  actors: z.array(RoleActorSchema).optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
});

export type ProjectRole = z.infer<typeof ProjectRoleSchema>;

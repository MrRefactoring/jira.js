import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleActorSchema } from './roleActor';

export const ProjectRoleActorsSchema = apiObject({
  actors: z.array(RoleActorSchema).optional(),
});

export type ProjectRoleActors = z.infer<typeof ProjectRoleActorsSchema>;

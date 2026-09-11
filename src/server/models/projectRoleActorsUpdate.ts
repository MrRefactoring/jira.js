import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectRoleActorsUpdateSchema = apiObject({
  categorisedActors: z.record(z.string(), z.array(z.string())).optional(),
  id: z.number().optional(),
});

export type ProjectRoleActorsUpdate = z.infer<typeof ProjectRoleActorsUpdateSchema>;

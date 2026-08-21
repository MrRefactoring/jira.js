import { z } from 'zod';
import { ProjectRoleActorsUpdateSchema } from '../models';

export const SetActorsSchema = z.object({
  /** The project id or project key */
  projectIdOrKey: z.string(),
  /** The project role id */
  id: z.number(),
  body: ProjectRoleActorsUpdateSchema,
});

export type SetActors = z.input<typeof SetActorsSchema>;

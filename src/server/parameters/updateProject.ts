import { z } from 'zod';
import { ProjectUpdateSchema } from '../models';

export const UpdateProjectSchema = z.object(ProjectUpdateSchema.shape).extend({
  /** Parameters to expand This parameter is a comma-separated list. */
  expand: z.array(z.string()).optional(),
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type UpdateProject = z.input<typeof UpdateProjectSchema>;

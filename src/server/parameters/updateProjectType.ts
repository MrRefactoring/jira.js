import { z } from 'zod';

export const UpdateProjectTypeSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
  /** The key of the new project type */
  newProjectTypeKey: z.string(),
});

export type UpdateProjectType = z.input<typeof UpdateProjectTypeSchema>;

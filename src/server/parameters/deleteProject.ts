import { z } from 'zod';

export const DeleteProjectSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type DeleteProject = z.input<typeof DeleteProjectSchema>;

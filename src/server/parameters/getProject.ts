import { z } from 'zod';

export const GetProjectSchema = z.object({
  /** Parameters to expand */
  expand: z.string().optional(),
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type GetProject = z.input<typeof GetProjectSchema>;

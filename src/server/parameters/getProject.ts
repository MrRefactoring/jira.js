import { z } from 'zod';

export const GetProjectSchema = z.object({
  /** Parameters to expand This parameter is a comma-separated list. */
  expand: z.array(z.string()).optional(),
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type GetProject = z.input<typeof GetProjectSchema>;

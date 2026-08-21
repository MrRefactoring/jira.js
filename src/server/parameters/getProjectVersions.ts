import { z } from 'zod';

export const GetProjectVersionsSchema = z.object({
  /** Parameters to expand */
  expand: z.string().optional(),
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type GetProjectVersions = z.input<typeof GetProjectVersionsSchema>;

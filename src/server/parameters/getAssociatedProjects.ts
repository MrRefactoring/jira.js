import { z } from 'zod';

export const GetAssociatedProjectsSchema = z.object({
  expand: z.union([z.string().optional(), z.array(z.string())]).optional(),
  /** Id of the issue type scheme whose projects we're accessing */
  schemeId: z.string(),
});

export type GetAssociatedProjects = z.input<typeof GetAssociatedProjectsSchema>;

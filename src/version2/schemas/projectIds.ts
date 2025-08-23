import { z } from 'zod';

/** A list of project IDs. */
export const ProjectIdsSchema = z.object({
  /** The IDs of projects. */
  projectIds: z.array(z.string()),
});

export type ProjectIds = z.infer<typeof ProjectIdsSchema>;

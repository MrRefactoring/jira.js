import { z } from 'zod';

/** Project ID details. */
export const ProjectIdSchema = z.object({
  /** The ID of the project. */
  id: z.string(),
});

export type ProjectId = z.infer<typeof ProjectIdSchema>;

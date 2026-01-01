import { z } from 'zod';

/** Project ID details. */
export const ProjectIdSchema = z.strictObject({
  /** The ID of the project. */
  id: z.string(),
});

export type ProjectId = z.infer<typeof ProjectIdSchema>;

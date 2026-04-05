import { z } from 'zod';

/** The project. */
export const ProjectUsageSchema = z.object({
  /** The project ID. */
  id: z.string().optional(),
});

export type ProjectUsage = z.infer<typeof ProjectUsageSchema>;

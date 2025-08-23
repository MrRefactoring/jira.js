import { z } from 'zod';

/** The project. */
export const StatusProjectUsageSchema = z.object({
  /** The project ID. */
  id: z.string().optional(),
});

export type StatusProjectUsage = z.infer<typeof StatusProjectUsageSchema>;

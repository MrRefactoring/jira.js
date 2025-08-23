import { z } from 'zod';

/** The starting point for the statuses in the workflow. */
export const WorkflowLayoutSchema = z.object({
  /** The x axis location. */
  x: z.number().optional(),
  /** The y axis location. */
  y: z.number().optional(),
});

export type WorkflowLayout = z.infer<typeof WorkflowLayoutSchema>;

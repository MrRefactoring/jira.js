import { z } from 'zod';

/** The x and y location of the status in the workflow. */
export const WorkflowStatusLayoutSchema = z.object({
  /** The x axis location. */
  x: z.number().nullable().optional(),
  /** The y axis location. */
  y: z.number().nullable().optional(),
});

export type WorkflowStatusLayout = z.infer<typeof WorkflowStatusLayoutSchema>;

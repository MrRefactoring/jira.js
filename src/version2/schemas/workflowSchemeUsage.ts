import { z } from 'zod';

/** The worflow scheme. */
export const WorkflowSchemeUsageSchema = z.object({
  /** The workflow scheme ID. */
  id: z.string().optional(),
});

export type WorkflowSchemeUsage = z.infer<typeof WorkflowSchemeUsageSchema>;

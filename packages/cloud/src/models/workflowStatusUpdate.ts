import { z } from 'zod';

/** Details of the status being updated. */
export const WorkflowStatusUpdateSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The ID of the status. When reusing an existing status, this field should be provided. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string(),
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  /**
   * The reference of the status. If adding a new status to a team-managed workflow, this must be a UUID (for
   * company-managed a UUID is not needed).
   */
  statusReference: z.string(),
});

export type WorkflowStatusUpdate = z.infer<typeof WorkflowStatusUpdateSchema>;

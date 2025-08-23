import { z } from 'zod';
import { WorkflowScopeSchema } from './workflowScope';

/** Details of a status. */
export const JiraWorkflowStatusSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The ID of the status. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string().optional(),
  scope: WorkflowScopeSchema.optional(),
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  /** The reference of the status. */
  statusReference: z.string().optional(),
});

export type JiraWorkflowStatus = z.infer<typeof JiraWorkflowStatusSchema>;

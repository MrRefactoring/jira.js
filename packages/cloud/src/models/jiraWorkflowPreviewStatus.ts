import { z } from 'zod';
import { WorkflowPreviewScopeSchema } from '#/models/workflowPreviewScope';

/** Details of a status. */
export const JiraWorkflowPreviewStatusSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The ID of the status. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string().optional(),
  /** The raw name of the status. */
  rawName: z.string().optional(),
  scope: WorkflowPreviewScopeSchema.optional(),
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  /** The reference of the status. Unique within this response but not guaranteed to be stable across requests. */
  statusReference: z.string().optional(),
});

export type JiraWorkflowPreviewStatus = z.infer<typeof JiraWorkflowPreviewStatusSchema>;

import { z } from 'zod';
import { WorkflowProjectIssueTypeUsagePageSchema } from './workflowProjectIssueTypeUsagePage';

/** Issue types associated with the workflow for a project. */
export const WorkflowProjectIssueTypeUsageDTOSchema = z.object({
  issueTypes: WorkflowProjectIssueTypeUsagePageSchema.optional(),
  /** The ID of the project. */
  projectId: z.string().optional(),
  /** The ID of the workflow. */
  workflowId: z.string().optional(),
});

export type WorkflowProjectIssueTypeUsageDTO = z.infer<typeof WorkflowProjectIssueTypeUsageDTOSchema>;

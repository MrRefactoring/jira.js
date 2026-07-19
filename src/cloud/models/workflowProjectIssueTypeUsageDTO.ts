import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowProjectIssueTypeUsagePageSchema } from './workflowProjectIssueTypeUsagePage';
/** Issue types associated with the workflow for a project. */

export const WorkflowProjectIssueTypeUsageDTOSchema = apiObject({
  issueTypes: WorkflowProjectIssueTypeUsagePageSchema.optional(),
  /** The ID of the project. */
  projectId: z.string().optional(),
  /** The ID of the workflow. */
  workflowId: z.string().optional(),
});

export type WorkflowProjectIssueTypeUsageDTO = z.infer<typeof WorkflowProjectIssueTypeUsageDTOSchema>;

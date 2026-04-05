import { z } from 'zod';

export const GetWorkflowSchemeDraftIssueTypeSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number(),
  /** The ID of the issue type. */
  issueType: z.string(),
});

export type GetWorkflowSchemeDraftIssueType = z.input<typeof GetWorkflowSchemeDraftIssueTypeSchema>;

import { z } from 'zod';

export const GetWorkflowSchemeIssueTypeSchema = z.object({
  /** The issue type to query. */
  issueType: z.string(),
  /** The id of the scheme. */
  id: z.number(),
  /** When true indicates that a scheme's draft, if it exists, should be queried instead of the scheme itself. */
  returnDraftIfExists: z.boolean().optional(),
});

export type GetWorkflowSchemeIssueType = z.input<typeof GetWorkflowSchemeIssueTypeSchema>;

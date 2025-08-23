import { z } from 'zod';

export const GetWorkflowSchemeDraftIssueTypeParametersSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number().int(),
  /** The ID of the issue type. */
  issueType: z.string(),
});

export type GetWorkflowSchemeDraftIssueTypeParameters = z.infer<typeof GetWorkflowSchemeDraftIssueTypeParametersSchema>;

import { z } from 'zod';

export const DeleteWorkflowSchemeDraftIssueTypeParametersSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number().int(),
  /** The ID of the issue type. */
  issueType: z.string(),
});

export type DeleteWorkflowSchemeDraftIssueTypeParameters = z.infer<
  typeof DeleteWorkflowSchemeDraftIssueTypeParametersSchema
>;

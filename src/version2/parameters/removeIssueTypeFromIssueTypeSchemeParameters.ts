import { z } from 'zod';

export const RemoveIssueTypeFromIssueTypeSchemeParametersSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number().int(),
  /** The ID of the issue type. */
  issueTypeId: z.number().int(),
});

export type RemoveIssueTypeFromIssueTypeSchemeParameters = z.infer<
  typeof RemoveIssueTypeFromIssueTypeSchemeParametersSchema
>;

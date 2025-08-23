import { z } from 'zod';

export const DeleteIssueTypeSchemeParametersSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number().int(),
});

export type DeleteIssueTypeSchemeParameters = z.infer<typeof DeleteIssueTypeSchemeParametersSchema>;

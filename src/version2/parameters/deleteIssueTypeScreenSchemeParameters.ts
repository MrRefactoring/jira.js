import { z } from 'zod';

export const DeleteIssueTypeScreenSchemeParametersSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
});

export type DeleteIssueTypeScreenSchemeParameters = z.infer<typeof DeleteIssueTypeScreenSchemeParametersSchema>;

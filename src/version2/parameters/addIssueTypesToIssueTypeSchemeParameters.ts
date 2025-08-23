import { z } from 'zod';

export const AddIssueTypesToIssueTypeSchemeParametersSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number().int(),
  /** The list of issue type IDs. */
  issueTypeIds: z.array(z.string()),
});

export type AddIssueTypesToIssueTypeSchemeParameters = z.infer<typeof AddIssueTypesToIssueTypeSchemeParametersSchema>;

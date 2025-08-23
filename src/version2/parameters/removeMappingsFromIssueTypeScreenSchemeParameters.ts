import { z } from 'zod';

export const RemoveMappingsFromIssueTypeScreenSchemeParametersSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
  /** The list of issue type IDs. */
  issueTypeIds: z.array(z.string()),
});

export type RemoveMappingsFromIssueTypeScreenSchemeParameters = z.infer<
  typeof RemoveMappingsFromIssueTypeScreenSchemeParametersSchema
>;

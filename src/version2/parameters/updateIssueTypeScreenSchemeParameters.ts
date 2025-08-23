import { z } from 'zod';

export const UpdateIssueTypeScreenSchemeParametersSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
  /** The description of the issue type screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type UpdateIssueTypeScreenSchemeParameters = z.infer<typeof UpdateIssueTypeScreenSchemeParametersSchema>;

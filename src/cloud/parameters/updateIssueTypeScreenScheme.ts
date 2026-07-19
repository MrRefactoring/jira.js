import { z } from 'zod';
import { IssueTypeScreenSchemeUpdateDetailsSchema } from '../models';

export const UpdateIssueTypeScreenSchemeSchema = z
  .object({
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: z.string(),
  })
  .extend(IssueTypeScreenSchemeUpdateDetailsSchema.shape);

export type UpdateIssueTypeScreenScheme = z.input<typeof UpdateIssueTypeScreenSchemeSchema>;

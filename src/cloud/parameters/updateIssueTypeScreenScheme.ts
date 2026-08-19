import { z } from 'zod';
import { IssueTypeScreenSchemeUpdateDetailsSchema } from '../models';

export const UpdateIssueTypeScreenSchemeSchema = z.object(IssueTypeScreenSchemeUpdateDetailsSchema.shape).extend({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
});

export type UpdateIssueTypeScreenScheme = z.input<typeof UpdateIssueTypeScreenSchemeSchema>;

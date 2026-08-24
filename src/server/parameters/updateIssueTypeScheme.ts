import { z } from 'zod';
import { IssueTypeSchemeCreateUpdateSchema } from '../models';

export const UpdateIssueTypeSchemeSchema = z.object(IssueTypeSchemeCreateUpdateSchema.shape).extend({
  /** The id of the issue type scheme to update. */
  schemeId: z.string(),
});

export type UpdateIssueTypeScheme = z.input<typeof UpdateIssueTypeSchemeSchema>;

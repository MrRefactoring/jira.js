import { z } from 'zod';
import { IssueTypeSchemeUpdateDetailsSchema } from '../models';

export const UpdateIssueTypeSchemeSchema = z.object({}).extend(IssueTypeSchemeUpdateDetailsSchema.shape).extend({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number(),
});

export type UpdateIssueTypeScheme = z.input<typeof UpdateIssueTypeSchemeSchema>;

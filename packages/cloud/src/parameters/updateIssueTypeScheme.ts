import { z } from 'zod';
import { IssueTypeSchemeUpdateDetailsSchema } from '../models';

export const UpdateIssueTypeSchemeSchema = z
  .object({
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: z.number(),
  })
  .extend(IssueTypeSchemeUpdateDetailsSchema.shape);

export type UpdateIssueTypeScheme = z.input<typeof UpdateIssueTypeSchemeSchema>;

import { z } from 'zod';
import { IssueTypeIdsSchema } from '../models';

export const AddIssueTypesToIssueTypeSchemeSchema = z.object(IssueTypeIdsSchema.shape).extend({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number(),
});

export type AddIssueTypesToIssueTypeScheme = z.input<typeof AddIssueTypesToIssueTypeSchemeSchema>;

import { z } from 'zod';
import { IssueTypeIdsSchema } from '../models';

export const AddIssueTypesToIssueTypeSchemeSchema = z
  .object({
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: z.number(),
  })
  .extend(IssueTypeIdsSchema.shape);

export type AddIssueTypesToIssueTypeScheme = z.input<typeof AddIssueTypesToIssueTypeSchemeSchema>;

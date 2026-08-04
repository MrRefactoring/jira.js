import { z } from 'zod';
import { IssueTypeIdsSchema } from '../models';

export const RemoveMappingsFromIssueTypeScreenSchemeSchema = z.object({}).extend(IssueTypeIdsSchema.shape).extend({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
});

export type RemoveMappingsFromIssueTypeScreenScheme = z.input<typeof RemoveMappingsFromIssueTypeScreenSchemeSchema>;

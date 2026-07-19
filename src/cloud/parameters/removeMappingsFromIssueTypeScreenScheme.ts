import { z } from 'zod';
import { IssueTypeIdsSchema } from '../models';

export const RemoveMappingsFromIssueTypeScreenSchemeSchema = z
  .object({
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: z.string(),
  })
  .extend(IssueTypeIdsSchema.shape);

export type RemoveMappingsFromIssueTypeScreenScheme = z.input<typeof RemoveMappingsFromIssueTypeScreenSchemeSchema>;

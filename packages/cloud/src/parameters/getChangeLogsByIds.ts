import { z } from 'zod';
import { IssueChangelogIdsSchema } from '../models';

export const GetChangeLogsByIdsSchema = z
  .object({
    /** The ID or key of the issue. */
    issueIdOrKey: z.string(),
  })
  .extend(IssueChangelogIdsSchema.shape);

export type GetChangeLogsByIds = z.input<typeof GetChangeLogsByIdsSchema>;

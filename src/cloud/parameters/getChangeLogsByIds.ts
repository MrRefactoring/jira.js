import { z } from 'zod';
import { IssueChangelogIdsSchema } from '../models';

export const GetChangeLogsByIdsSchema = z.object(IssueChangelogIdsSchema.shape).extend({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type GetChangeLogsByIds = z.input<typeof GetChangeLogsByIdsSchema>;

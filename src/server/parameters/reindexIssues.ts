import { z } from 'zod';

export const ReindexIssuesSchema = z.object({
  /** The IDs or keys of one or more issues to reindex. */
  issueId: z.array(z.string()).optional(),
  /** Indicates that changeHistory should also be reindexed. */
  indexChangeHistory: z.boolean().optional(),
  /** Indicates that worklogs should also be reindexed. */
  indexWorklogs: z.boolean().optional(),
  /** Indicates that comments should also be reindexed. */
  indexComments: z.boolean().optional(),
});

export type ReindexIssues = z.input<typeof ReindexIssuesSchema>;

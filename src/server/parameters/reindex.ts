import { z } from 'zod';

export const ReindexSchema = z.object({
  /**
   * Indicates that changeHistory should also be reindexed. Not relevant for foreground reindex, where changeHistory is
   * always reindexed.
   */
  indexChangeHistory: z.boolean().optional(),
  /**
   * Case insensitive String indicating type of reindex. If omitted, then defaults to BACKGROUND_PREFERRED. Not relevant
   * for Search Platform that only supports BACKGROUND reindexing e.g. OpenSearch.
   */
  type: z.string().optional(),
  /**
   * Indicates that worklogs should also be reindexed. Not relevant for foreground reindex, where worklogs are always
   * reindexed.
   */
  indexWorklogs: z.boolean().optional(),
  /**
   * Indicates that comments should also be reindexed. Not relevant for foreground reindex, where comments are always
   * reindexed.
   */
  indexComments: z.boolean().optional(),
});

export type Reindex = z.input<typeof ReindexSchema>;

import { z } from 'zod';

/** A list of changelog IDs. */
export const IssueChangelogIdsSchema = z.object({
  /** The list of changelog IDs. */
  changelogIds: z.array(z.number().int()),
});

export type IssueChangelogIds = z.infer<typeof IssueChangelogIdsSchema>;

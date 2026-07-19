import { z } from 'zod';
import { apiObject } from '#/core';
/** A list of changelog IDs. */

export const IssueChangelogIdsSchema = apiObject({
  /** The list of changelog IDs. */
  changelogIds: z.array(z.number()),
});

export type IssueChangelogIds = z.infer<typeof IssueChangelogIdsSchema>;

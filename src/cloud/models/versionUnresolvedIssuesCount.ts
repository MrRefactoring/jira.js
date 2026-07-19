import { z } from 'zod';
import { apiObject } from '#/core';
/** Count of a version's unresolved issues. */

export const VersionUnresolvedIssuesCountSchema = apiObject({
  /** Count of issues. */
  issuesCount: z.number().optional(),
  /** Count of unresolved issues. */
  issuesUnresolvedCount: z.number().optional(),
  /** The URL of these count details. */
  self: z.string().url().optional(),
});

export type VersionUnresolvedIssuesCount = z.infer<typeof VersionUnresolvedIssuesCountSchema>;

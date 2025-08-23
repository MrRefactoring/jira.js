import { z } from 'zod';

/** Count of a version's unresolved issues. */
export const VersionUnresolvedIssuesCountSchema = z.object({
  /** Count of issues. */
  issuesCount: z.number().int().optional(),
  /** Count of unresolved issues. */
  issuesUnresolvedCount: z.number().int().optional(),
  /** The URL of these count details. */
  self: z.string().optional(),
});

export type VersionUnresolvedIssuesCount = z.infer<typeof VersionUnresolvedIssuesCountSchema>;

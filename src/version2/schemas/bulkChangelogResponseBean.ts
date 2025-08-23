import { z } from 'zod';
import { IssueChangeLogSchema } from './issueChangeLog';

/** A page of changelogs which is designed to handle multiple issues */
export const BulkChangelogResponseBeanSchema = z.object({
  /** The list of issues changelogs. */
  issueChangeLogs: z.array(IssueChangeLogSchema).optional(),
  /**
   * Continuation token to fetch the next page. If this result represents the last or the only page, this token will be
   * null.
   */
  nextPageToken: z.string().optional(),
});

export type BulkChangelogResponseBean = z.infer<typeof BulkChangelogResponseBeanSchema>;

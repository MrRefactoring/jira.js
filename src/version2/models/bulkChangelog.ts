import type { IssueChangeLog } from './issueChangeLog';

/** A page of changelogs which is designed to handle multiple issues */
export interface BulkChangelog {
  /** The list of issues changelogs. */
  issueChangeLogs?: IssueChangeLog[];
  /**
   * Continuation token to fetch the next page. If this result represents the last or the only page, this token will be
   * null.
   */
  nextPageToken?: string;
}

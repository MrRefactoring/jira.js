import type { IssueChangelogIds } from '../models/index.js';

export interface GetChangeLogsByIds extends IssueChangelogIds {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}

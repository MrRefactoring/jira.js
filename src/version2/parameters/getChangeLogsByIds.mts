import { IssueChangelogIds } from '../models/index.mjs';

export interface GetChangeLogsByIds extends IssueChangelogIds {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}

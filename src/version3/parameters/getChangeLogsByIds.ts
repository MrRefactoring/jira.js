import { IssueChangelogIds } from '../models';

export interface GetChangeLogsByIds extends IssueChangelogIds {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}

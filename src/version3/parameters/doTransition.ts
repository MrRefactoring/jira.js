import type { IssueUpdateDetails } from '../models/index.js';

export interface DoTransition extends IssueUpdateDetails {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}

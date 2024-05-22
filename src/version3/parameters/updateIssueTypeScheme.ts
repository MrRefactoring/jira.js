import type { IssueTypeSchemeUpdateDetails } from '../models/index.js';

export interface UpdateIssueTypeScheme extends IssueTypeSchemeUpdateDetails {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}

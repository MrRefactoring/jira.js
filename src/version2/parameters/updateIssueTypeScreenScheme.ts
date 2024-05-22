import type { IssueTypeScreenSchemeUpdateDetails } from '../models/index.js';

export interface UpdateIssueTypeScreenScheme extends IssueTypeScreenSchemeUpdateDetails {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

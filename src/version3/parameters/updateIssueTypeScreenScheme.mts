import { IssueTypeScreenSchemeUpdateDetails } from '../models/index.mjs';

export interface UpdateIssueTypeScreenScheme extends IssueTypeScreenSchemeUpdateDetails {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

import { IssueTypeSchemeUpdateDetails } from '../models';

export interface UpdateIssueTypeScheme extends IssueTypeSchemeUpdateDetails {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}

import { IssueTypeIDs } from '../models';

export interface AddIssueTypesToIssueTypeScheme extends IssueTypeIDs {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}

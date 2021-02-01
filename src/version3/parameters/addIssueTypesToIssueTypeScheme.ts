import { IssueTypeIds } from '../models';

export interface AddIssueTypesToIssueTypeScheme extends IssueTypeIds {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}

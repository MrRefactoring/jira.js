import { IssueTypeIds } from '../models/index.mjs';

export interface AddIssueTypesToIssueTypeScheme extends IssueTypeIds {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}

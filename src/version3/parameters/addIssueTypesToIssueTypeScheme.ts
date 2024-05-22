import type { IssueTypeIds } from '../models/index.js';

export interface AddIssueTypesToIssueTypeScheme extends IssueTypeIds {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}

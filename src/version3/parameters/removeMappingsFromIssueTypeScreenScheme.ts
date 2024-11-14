import type { IssueTypeIds } from '../models/index.js';

export interface RemoveMappingsFromIssueTypeScreenScheme extends IssueTypeIds {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

import { IssueTypeIds } from '../models/index.mjs';

export interface RemoveMappingsFromIssueTypeScreenScheme extends IssueTypeIds {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

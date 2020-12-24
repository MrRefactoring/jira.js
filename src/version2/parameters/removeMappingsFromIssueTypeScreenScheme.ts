import { IssueTypeIDs } from '../models';

export interface RemoveMappingsFromIssueTypeScreenScheme extends IssueTypeIDs {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

import type { IssueTypeScreenSchemeMappingDetails } from '../models/index.js';

export interface AppendMappingsForIssueTypeScreenScheme extends IssueTypeScreenSchemeMappingDetails {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

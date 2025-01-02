import { IssueTypeScreenSchemeMappingDetails } from '../models/index.mjs';

export interface AppendMappingsForIssueTypeScreenScheme extends IssueTypeScreenSchemeMappingDetails {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

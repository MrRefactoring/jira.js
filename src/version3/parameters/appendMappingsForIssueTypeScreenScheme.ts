import { IssueTypeScreenSchemeMappingDetails } from '../models';

export interface AppendMappingsForIssueTypeScreenScheme extends IssueTypeScreenSchemeMappingDetails {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
}

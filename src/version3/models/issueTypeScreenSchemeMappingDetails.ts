import { IssueTypeScreenSchemeMapping } from './issueTypeScreenSchemeMapping';

/** A list of issue type screen scheme mappings. */
export interface IssueTypeScreenSchemeMappingDetails {
  /**
   * The list of issue type to screen scheme mappings. A *default* entry cannot be specified because a default entry is
   * added when an issue type screen scheme is created.
   */
  issueTypeMappings: IssueTypeScreenSchemeMapping[];
}

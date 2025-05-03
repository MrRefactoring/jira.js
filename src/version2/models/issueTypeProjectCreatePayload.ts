import type { IssueTypeHierarchyPayload } from './issueTypeHierarchyPayload';
import type { IssueTypeSchemePayload } from './issueTypeSchemePayload';
import type { IssueTypePayload } from './issueTypePayload';

/** The payload for creating issue types in a project */
export interface IssueTypeProjectCreatePayload {
  /**
   * Defines the issue type hierarhy to be created and used during this project creation. This will only add new levels
   * if there isn't an existing level
   */
  issueTypeHierarchy?: IssueTypeHierarchyPayload[];
  issueTypeScheme?: IssueTypeSchemePayload;
  /**
   * Only needed if you want to create issue types, you can otherwise use the ids of issue types in the scheme
   * configuration
   */
  issueTypes?: IssueTypePayload[];
}

import { Scope } from './scope';

/** Details of the issue creation metadata for an issue type. */
export interface IssueTypeIssueCreateMetadata {
  /** The URL of these issue type details. */
  self?: string;
  /** The ID of the issue type. */
  id?: string;
  /** The description of the issue type. */
  description?: string;
  /** The URL of the issue type's avatar. */
  iconUrl?: string;
  /** The name of the issue type. */
  name?: string;
  /** Whether this issue type is used to create subtasks. */
  subtask?: boolean;
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** Unique ID for next-gen projects. */
  entityId?: string;
  /** Hierarchy level of the issue type. */
  hierarchyLevel?: number;
  scope?: Scope;
  /** Expand options that include additional issue type metadata details in the response. */
  expand?: string;
  /** List of the fields available when creating an issue for the issue type. */
  fields?: {};
}

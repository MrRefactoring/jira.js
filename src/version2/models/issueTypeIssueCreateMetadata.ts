import type { Scope } from './scope';

/** Details of the issue creation metadata for an issue type. */
export interface IssueTypeIssueCreateMetadata {
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** Unique ID for next-gen projects. */
  entityId?: string;
  /** Expand options that include additional issue type metadata details in the response. */
  expand?: string;
  /** List of the fields available when creating an issue for the issue type. */
  fields?: unknown;
  /** Hierarchy level of the issue type. */
  hierarchyLevel?: number;
  /** The URL of the issue type's avatar. */
  iconUrl?: string;
  /** The ID of the issue type. */
  id?: string;
  /** The name of the issue type. */
  name?: string;
  scope?: Scope;
  /** The URL of these issue type details. */
  self?: string;
  /** Whether this issue type is used to create subtasks. */
  subtask?: boolean;
}

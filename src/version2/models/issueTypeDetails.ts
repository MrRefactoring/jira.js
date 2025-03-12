import type { Scope } from './scope';

/** Details about an issue type. */
export interface IssueTypeDetails {
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** Unique ID for next-gen projects. */
  entityId?: string;
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

import { Scope } from './scope';

/**
 * Details about an issue type. */
export interface IssueTypeDetails {
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
  /** Details of the next-gen projects the issue type is available in. */
  scope?: Scope[];
}

import type { StatusDetails } from './statusDetails';

/** Status details for an issue type. */
export interface IssueTypeWithStatus {
  /** The ID of the issue type. */
  id: string;
  /** The name of the issue type. */
  name: string;
  /** The URL of the issue type's status details. */
  self: string;
  /** List of status details for the issue type. */
  statuses: StatusDetails[];
  /** Whether this issue type represents subtasks. */
  subtask: boolean;
}

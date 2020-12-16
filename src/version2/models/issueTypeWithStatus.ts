import { StatusDetails } from './statusDetails';

/**
 * Status details for an issue type. */
export interface IssueTypeWithStatus {
  /** The URL of the issue type's status details. */
  self: string;
  /** The ID of the issue type. */
  id: string;
  /** The name of the issue type. */
  name: string;
  /** Whether this issue type represents subtasks. */
  subtask: boolean;
  /** List of status details for the issue type. */
  statuses: StatusDetails[];
}

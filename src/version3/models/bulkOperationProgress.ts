import type { User } from './user';

export interface BulkOperationProgress {
  /** A timestamp of when the task was submitted. */
  created?: string;
  /**
   * Map of issue IDs for which the operation failed and that the user has permission to view, to their one or more
   * reasons for failure. These reasons are open-ended text descriptions of the error and are not selected from a
   * predefined list of standard reasons.
   */
  failedAccessibleIssues?: unknown;
  /**
   * The number of issues that are either invalid or issues that the user doesn't have permission to view, regardless of
   * the success or failure of the operation.
   */
  invalidOrInaccessibleIssueCount?: number;
  /** List of issue IDs for which the operation was successful and that the user has permission to view. */
  processedAccessibleIssues?: number[];
  /** Progress of the task as a percentage. */
  progressPercent?: number;
  /** A timestamp of when the task was started. */
  started?: string;
  /** The status of the task. */
  status?: 'ENQUEUED' | 'RUNNING' | 'COMPLETE' | 'FAILED' | 'CANCEL_REQUESTED' | 'CANCELLED' | 'DEAD' | string;
  submittedBy?: User;
  /** The ID of the task. */
  taskId: string;
  /** The number of issues that the bulk operation was attempted on. */
  totalIssueCount?: number;
  /** A timestamp of when the task progress was last updated. */
  updated?: string;
}

import type { WorklogIdsRequest } from '../models';

export interface BulkDeleteWorklogs extends WorklogIdsRequest {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /**
   * Defines how to update the issue's time estimate, the options are:
   *
   * - `leave` Leaves the estimate unchanged.
   * - `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being deleted.
   */
  adjustEstimate?: 'leave' | 'auto' | string;
  /**
   * Whether the work log entries should be removed to the issue even if the issue is not editable, because
   * jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with
   * admin permission can use this flag.
   */
  overrideEditableFlag?: boolean;
}

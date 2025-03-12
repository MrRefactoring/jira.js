import type { Document, Worklog } from '../models';

export interface UpdateWorklog extends Omit<Worklog, 'comment'> {
  /** The ID or key the issue. */
  issueIdOrKey: string;
  /** The ID of the worklog. */
  id: string;
  /** Whether users watching the issue are notified by email. */
  notifyUsers?: boolean;
  /**
   * Defines how to update the issue's time estimate, the options are:
   *
   * - `new` Sets the estimate to a specific value, defined in `newEstimate`.
   * - `leave` Leaves the estimate unchanged.
   * - `auto` Updates the estimate by the difference between the original and updated value of `timeSpent` or
   *   `timeSpentSeconds`.
   */
  adjustEstimate?: 'new' | 'leave' | 'manual' | 'auto' | string;
  /**
   * A comment about the worklog in [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/). Optional when creating or
   * updating a worklog.
   */
  comment?: string | Document;
  /**
   * The value to set as the issue's remaining time estimate, as days (#d), hours (#h), or minutes (#m or #). For
   * example, _2d_. Required when `adjustEstimate` is `new`.
   */
  newEstimate?: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties`, which returns worklog properties.
   */
  expand?: string;
  /**
   * Whether the worklog should be added to the issue even if the issue is not editable. For example, because the issue
   * is closed. Connect and Forge app users with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
   */
  overrideEditableFlag?: boolean;
}

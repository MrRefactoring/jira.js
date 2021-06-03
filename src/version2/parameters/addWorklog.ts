import { Worklog } from '../models';

export interface AddWorklog extends Worklog {
  /** The ID or key the issue. */
  issueIdOrKey: string;
  /** Whether users watching the issue are notified by email. */
  notifyUsers?: boolean;
  /**
   * Defines how to update the issue's time estimate, the options are:
   *
   * `new` Sets the estimate to a specific value, defined in `newEstimate`. `leave` Leaves the estimate unchanged.
   * `manual` Reduces the estimate by amount specified in `reduceBy`. `auto` Reduces the estimate by the value of
   * `timeSpent` in the worklog.
   */
  adjustEstimate?: string;
  /**
   * The value to set as the issue's remaining time estimate, as days (#d), hours (#h), or minutes (#m or #). For
   * example, *2d*. Required when `adjustEstimate` is `new`.
   */
  newEstimate?: string;
  /**
   * The amount to reduce the issue's remaining estimate by, as days (#d), hours (#h), or minutes (#m). For example,
   * *2d*. Required when `adjustEstimate` is `manual`.
   */
  reduceBy?: string;
  /**
   * Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts
   * `properties`, which returns worklog properties.
   */
  expand?: string;
  /**
   * Whether the worklog entry should be added to the issue even if the issue is not editable, because
   * jira.issue.editable set to false or missing. For example, the issue is closed. Only connect app users with admin
   * scope permission can use this flag.
   */
  overrideEditableFlag?: boolean;
}

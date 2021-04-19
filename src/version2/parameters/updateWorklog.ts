import { Worklog } from '../models';

export interface UpdateWorklog extends Worklog {
  /** The ID or key the issue. */
  issueIdOrKey: string;
  /** The ID of the worklog. */
  id: string;
  /** Whether users watching the issue are notified by email. */
  notifyUsers?: boolean;
  /** Defines how to update the issue's time estimate, the options are:

   *  `new` Sets the estimate to a specific value, defined in `newEstimate`.
   *  `leave` Leaves the estimate unchanged.
   *  `auto` Updates the estimate by the difference between the original and updated value of `timeSpent` or `timeSpentSeconds`. */
  adjustEstimate?: string;
  /** The value to set as the issue's remaining time estimate, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when `adjustEstimate` is `new`. */
  newEstimate?: string;
  /** Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties`, which returns worklog properties. */
  expand?: string;
  /** Whether the worklog should be added to the issue even if the issue is not editable. For example, because the issue is closed. Only connect app users with admin permissions can use this flag. */
  overrideEditableFlag?: boolean;
}

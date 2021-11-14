import { IssueUpdateDetails } from '../models';

export interface EditIssue extends IssueUpdateDetails {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /**
   * Whether a notification email about the issue update is sent to all watchers. To disable the notification,
   * administer Jira or administer project permissions are required. If the user doesn't have the necessary permission
   * the request is ignored.
   */
  notifyUsers?: boolean;
  /**
   * Whether screen security is overridden to enable hidden fields to be edited. Available to Connect app users with
   * admin permission and Forge app users with the `manage:jira-configuration` scope.
   */
  overrideScreenSecurity?: boolean;
  /**
   * Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users with
   * admin permission and Forge app users with the `manage:jira-configuration` scope.
   */
  overrideEditableFlag?: boolean;
}

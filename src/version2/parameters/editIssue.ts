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
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of
   * users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideScreenSecurity?: boolean;
  /**
   * Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users with
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of
   * users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideEditableFlag?: boolean;
}

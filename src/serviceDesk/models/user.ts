import { UserLink } from './userLink';

export interface User {
  /**
   * The accountId of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId?: string;
  /**
   * @deprecated This property is no longer available and will be removed from the documentation soon. See the
   *   [deprecation
   *   notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   *   for details.
   */
  name?: string;
  /** Customer's email address. Depending on the customer’s privacy settings, this may be returned as null. */
  emailAddress?: string;
  /**
   * Customer's name for display in a UI. Depending on the customer’s privacy settings, this may return an alternative
   * value.
   */
  displayName?: string;
  /** Indicates if the customer is active (true) or inactive (false) */
  active?: boolean;
  /** Customer time zone. Depending on the customer’s privacy settings, this may be returned as null. */
  timeZone?: string;
  Links?: UserLink;
}

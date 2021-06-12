import { AvatarUrlsBean } from './avatarUrlsBean';
import { SimpleListWrapperGroupName } from './simpleListWrapperGroupName';
import { SimpleListWrapperApplicationRole } from './simpleListWrapperApplicationRole';

/**
 * A user with details as permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:*
 *
 * - User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case,
 *   `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).
 * - User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted
 *   users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.
 * - User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have
 *   fallback values.
 */
export interface User {
  /** The URL of the user. */
  self?: string;
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * *5b10ac8d82e05b22cc7d4ef5*. Required in requests.
   */
  accountId?: string;
  /**
   * The user account type. Can take the following values:
   *
   * `atlassian` regular Atlassian user account `app` system account used for Connect applications and OAuth to
   * represent external systems `customer` Jira Service Desk account representing an external service desk
   */
  accountType?: string;
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /** The email address of the user. Depending on the user’s privacy setting, this may be returned as null. */
  emailAddress?: string;
  avatarUrls?: AvatarUrlsBean;
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The time zone specified in the user's profile. Depending on the user’s privacy setting, this may be returned as null. */
  timeZone?: string;
  /** The locale of the user. Depending on the user’s privacy setting, this may be returned as null. */
  locale?: string;
  groups?: SimpleListWrapperGroupName;
  applicationRoles?: SimpleListWrapperApplicationRole;
  /** Expand options that include additional user details in the response. */
  expand?: string;
}

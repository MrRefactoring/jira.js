import { z } from 'zod';

/**
 * User details permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions: *
 *
 * - - User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case,
 *       `displayName` provides an indication and other parameters have default values or are blank (for example, email
 *       is blank).
 * - - User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted
 *       users. In this case, `accountId` returns _unknown_ and all other parameters have fallback values.
 * - - User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have
 *       fallback values.
 */
export const UserDetailsSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /**
   * The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application
   * user) or 'customer' (Jira Service Desk customer user)
   */
  accountType: z.string().optional(),
  /** Whether the user is active. */
  active: z.boolean().optional(),
  /** The avatars of the user. */
  avatarUrls: z.unknown().optional(),
  /** The display name of the user. Depending on the user’s privacy settings, this may return an alternative value. */
  displayName: z.string().optional(),
  /** The email address of the user. Depending on the user’s privacy settings, this may be returned as null. */
  emailAddress: z.string().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key: z.string().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name: z.string().optional(),
  /** The URL of the user. */
  self: z.string().optional(),
  /**
   * The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as
   * null.
   */
  timeZone: z.string().optional(),
});

export type UserDetails = z.infer<typeof UserDetailsSchema>;

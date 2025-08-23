import { z } from 'zod';

export const UserBeanSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /** Whether the user is active. */
  active: z.boolean().optional(),
  /** The avatars of the user. */
  avatarUrls: z.unknown().optional(),
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName: z.string().optional(),
  /**
   * This property is deprecated in favor of `accountId` because of privacy changes. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The key of the user.
   */
  key: z.string().optional(),
  /**
   * This property is deprecated in favor of `accountId` because of privacy changes. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The username of the user.
   */
  name: z.string().optional(),
  /** The URL of the user. */
  self: z.string().optional(),
});

export type UserBean = z.infer<typeof UserBeanSchema>;

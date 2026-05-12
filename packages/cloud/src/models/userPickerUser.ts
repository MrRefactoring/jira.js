import { z } from 'zod';

/** A user found in a search. */
export const UserPickerUserSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /**
   * The user account type. Can take the following values:
   *
   * - `atlassian` regular Atlassian user account
   * - `app` system account used for Connect applications and OAuth to represent external systems
   * - `customer` Jira Service Desk account representing an external service desk
   */
  accountType: z.enum(['atlassian', 'app', 'customer', 'unknown']).optional(),
  /** The avatar URL of the user. */
  avatarUrl: z.url().optional(),
  /** The display name of the user. Depending on the user’s privacy setting, this may be returned as null. */
  displayName: z.string().optional(),
  /**
   * The display name, email address, and key of the user with the matched query string highlighted with the HTML bold
   * tag.
   */
  html: z.string().optional(),
});

export type UserPickerUser = z.infer<typeof UserPickerUserSchema>;

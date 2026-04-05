import { z } from 'zod';
import { UserAvatarUrlsSchema } from '#/models/userAvatarUrls';

export const DashboardUserSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
  /** Whether the user is active. */
  active: z.boolean().optional(),
  avatarUrls: UserAvatarUrlsSchema.optional(),
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName: z.string().optional(),
  /** The URL of the user. */
  self: z.url().optional(),
});

export type DashboardUser = z.infer<typeof DashboardUserSchema>;

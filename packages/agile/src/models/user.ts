import { z } from 'zod';

export const UserSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
  /** Whether the user is active. */
  active: z.boolean().optional(),
  avatarUrls: z
    .object({
      /** The URL of the user's 16x16 pixel avatar. */
      '16x16': z.url().optional(),
      /** The URL of the user's 24x24 pixel avatar. */
      '24x24': z.url().optional(),
      /** The URL of the user's 32x32 pixel avatar. */
      '32x32': z.url().optional(),
      /** The URL of the user's 48x48 pixel avatar. */
      '48x48': z.url().optional(),
    })
    .optional(),
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName: z.string().optional(),
  /** The URL of the user. */
  self: z.url().optional(),
});

export type User = z.infer<typeof UserSchema>;

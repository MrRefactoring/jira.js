import { z } from 'zod';

export const UserBeanAvatarUrlsSchema = z.object({
  /** The URL of the user's 16x16 pixel avatar. */
  '16x16': z.string().optional(),
  /** The URL of the user's 24x24 pixel avatar. */
  '24x24': z.string().optional(),
  /** The URL of the user's 32x32 pixel avatar. */
  '32x32': z.string().optional(),
  /** The URL of the user's 48x48 pixel avatar. */
  '48x48': z.string().optional(),
});

export type UserBeanAvatarUrls = z.infer<typeof UserBeanAvatarUrlsSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';

export const AvatarUrlsSchema = apiObject({
  /** The URL of the item's 16x16 pixel avatar. */
  '16x16': z.string().url().optional(),
  /** The URL of the item's 24x24 pixel avatar. */
  '24x24': z.string().url().optional(),
  /** The URL of the item's 32x32 pixel avatar. */
  '32x32': z.string().url().optional(),
  /** The URL of the item's 48x48 pixel avatar. */
  '48x48': z.string().url().optional(),
});

export type AvatarUrls = z.infer<typeof AvatarUrlsSchema>;

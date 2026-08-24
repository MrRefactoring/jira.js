import { z } from 'zod';
import { apiObject } from '#/core';

export const AvatarSchema = apiObject({
  id: z.string().optional(),
  owner: z.string().optional(),
  selected: z.boolean().optional(),
  isSelected: z.boolean().optional(),
  isSystemAvatar: z.boolean().optional(),
  isDeletable: z.boolean().optional(),
  fileName: z.string().optional(),
  /** The avatar at each size, keyed by size. */
  urls: z.record(z.string(), z.any()).optional(),
});

export type Avatar = z.infer<typeof AvatarSchema>;

import { z } from 'zod';

export const StoreAvatarParametersSchema = z.object({
  /** The avatar type. */
  type: z.enum(['project', 'issuetype', 'priority']),
  /** The ID of the item the avatar is associated with. */
  entityId: z.string(),
  /** The X coordinate of the top-left corner of the crop region. */
  x: z.number().int().optional(),
  /** The Y coordinate of the top-left corner of the crop region. */
  y: z.number().int().optional(),
  /** The length of each side of the crop region. */
  size: z.number().int(),
});

export type StoreAvatarParameters = z.infer<typeof StoreAvatarParametersSchema>;

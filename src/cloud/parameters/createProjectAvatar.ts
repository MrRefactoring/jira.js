import { z } from 'zod';

export const CreateProjectAvatarSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
  /** The X coordinate of the top-left corner of the crop region. */
  x: z.number().optional(),
  /** The Y coordinate of the top-left corner of the crop region. */
  y: z.number().optional(),
  /** The length of each side of the crop region. */
  size: z.number().optional(),
  body: z.record(z.string(), z.any()),
});

export type CreateProjectAvatar = z.input<typeof CreateProjectAvatarSchema>;

import { z } from 'zod';

export const CreateProjectAvatarParametersSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
  /** The X coordinate of the top-left corner of the crop region. */
  x: z.number().int().optional(),
  /** The Y coordinate of the top-left corner of the crop region. */
  y: z.number().int().optional(),
  /** The length of each side of the crop region. */
  size: z.number().int().optional(),
});

export type CreateProjectAvatarParameters = z.infer<typeof CreateProjectAvatarParametersSchema>;

import { z } from 'zod';

export const UpdateScreenSchemeParametersSchema = z.object({
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
  /**
   * The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are
   * accepted.
   */
  screens: z.unknown().optional(),
});

export type UpdateScreenSchemeParameters = z.infer<typeof UpdateScreenSchemeParametersSchema>;

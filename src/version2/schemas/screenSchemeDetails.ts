import { z } from 'zod';

/** Details of a screen scheme. */
export const ScreenSchemeDetailsSchema = z.object({
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
  /**
   * The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are
   * accepted.
   */
  screens: z.unknown(),
});

export type ScreenSchemeDetails = z.infer<typeof ScreenSchemeDetailsSchema>;

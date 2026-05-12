import { z } from 'zod';

/** The ID of a screen scheme. */
export const ScreenSchemeIdSchema = z.object({
  /** The ID of the screen scheme. */
  id: z.number(),
});

export type ScreenSchemeId = z.infer<typeof ScreenSchemeIdSchema>;

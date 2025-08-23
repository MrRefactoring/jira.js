import { z } from 'zod';

/** A screen with tab details. */
export const ScreenWithTabSchema = z.object({
  /** The description of the screen. */
  description: z.string().optional(),
  /** The ID of the screen. */
  id: z.number().int().optional(),
  /** The name of the screen. */
  name: z.string().optional(),
  /** The scope of the screen. */
  scope: z.unknown().optional(),
  /** The tab for the screen. */
  tab: z.unknown().optional(),
});

export type ScreenWithTab = z.infer<typeof ScreenWithTabSchema>;

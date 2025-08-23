import { z } from 'zod';

/** A screen. */
export const ScreenSchema = z.object({
  /** The description of the screen. */
  description: z.string().optional(),
  /** The ID of the screen. */
  id: z.number().int().optional(),
  /** The name of the screen. */
  name: z.string().optional(),
  /** The scope of the screen. */
  scope: z.unknown().optional(),
});

export type Screen = z.infer<typeof ScreenSchema>;

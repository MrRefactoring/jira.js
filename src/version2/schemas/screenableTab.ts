import { z } from 'zod';

/** A screen tab. */
export const ScreenableTabSchema = z.object({
  /** The ID of the screen tab. */
  id: z.number().int().optional(),
  /** The name of the screen tab. The maximum length is 255 characters. */
  name: z.string(),
});

export type ScreenableTab = z.infer<typeof ScreenableTabSchema>;

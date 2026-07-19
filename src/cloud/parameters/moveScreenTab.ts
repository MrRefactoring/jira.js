import { z } from 'zod';

export const MoveScreenTabSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number(),
  /** The ID of the screen tab. */
  tabId: z.number(),
  /** The position of tab. The base index is 0. */
  pos: z.number(),
});

export type MoveScreenTab = z.input<typeof MoveScreenTabSchema>;

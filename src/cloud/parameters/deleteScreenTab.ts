import { z } from 'zod';

export const DeleteScreenTabSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number(),
  /** The ID of the screen tab. */
  tabId: z.number(),
});

export type DeleteScreenTab = z.input<typeof DeleteScreenTabSchema>;

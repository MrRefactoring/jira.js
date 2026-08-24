import { z } from 'zod';

export const DeleteTabSchema = z.object({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
});

export type DeleteTab = z.input<typeof DeleteTabSchema>;

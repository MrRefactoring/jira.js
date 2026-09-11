import { z } from 'zod';

export const MoveTabSchema = z.object({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
  /** Position of tab */
  pos: z.number(),
});

export type MoveTab = z.input<typeof MoveTabSchema>;

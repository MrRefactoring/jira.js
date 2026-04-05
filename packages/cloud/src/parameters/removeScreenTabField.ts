import { z } from 'zod';

export const RemoveScreenTabFieldSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number(),
  /** The ID of the screen tab. */
  tabId: z.number(),
  /** The ID of the field. */
  id: z.string(),
});

export type RemoveScreenTabField = z.input<typeof RemoveScreenTabFieldSchema>;

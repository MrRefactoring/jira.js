import { z } from 'zod';

export const RemoveFieldSchema = z.object({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
  /** Id of field */
  id: z.string(),
});

export type RemoveField = z.input<typeof RemoveFieldSchema>;

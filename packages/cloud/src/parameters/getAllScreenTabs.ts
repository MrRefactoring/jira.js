import { z } from 'zod';

export const GetAllScreenTabsSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number(),
  /** The key of the project. */
  projectKey: z.string().optional(),
});

export type GetAllScreenTabs = z.input<typeof GetAllScreenTabsSchema>;

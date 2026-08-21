import { z } from 'zod';

export const GetAllTabsSchema = z.object({
  /** Id of screen */
  screenId: z.number(),
  /** The key of the project; this parameter is optional */
  projectKey: z.string().optional(),
});

export type GetAllTabs = z.input<typeof GetAllTabsSchema>;

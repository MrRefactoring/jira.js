import { z } from 'zod';

export const GetAllScreenTabFieldsSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number(),
  /** The ID of the screen tab. */
  tabId: z.number(),
  /** The key of the project. */
  projectKey: z.string().optional(),
});

export type GetAllScreenTabFields = z.input<typeof GetAllScreenTabFieldsSchema>;

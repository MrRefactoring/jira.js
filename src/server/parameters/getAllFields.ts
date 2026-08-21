import { z } from 'zod';

export const GetAllFieldsSchema = z.object({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
  /** The key of the project; this parameter is optional */
  projectKey: z.string().optional(),
});

export type GetAllFields = z.input<typeof GetAllFieldsSchema>;

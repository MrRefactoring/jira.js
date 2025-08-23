import { z } from 'zod';

export const GetAllScreenTabsParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The key of the project. */
  projectKey: z.string().optional(),
});

export type GetAllScreenTabsParameters = z.infer<typeof GetAllScreenTabsParametersSchema>;

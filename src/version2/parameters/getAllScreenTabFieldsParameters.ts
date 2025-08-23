import { z } from 'zod';

export const GetAllScreenTabFieldsParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The ID of the screen tab. */
  tabId: z.number().int(),
  /** The key of the project. */
  projectKey: z.string().optional(),
});

export type GetAllScreenTabFieldsParameters = z.infer<typeof GetAllScreenTabFieldsParametersSchema>;

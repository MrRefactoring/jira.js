import { z } from 'zod';

export const RemoveScreenTabFieldParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The ID of the screen tab. */
  tabId: z.number().int(),
  /** The ID of the field. */
  id: z.string(),
});

export type RemoveScreenTabFieldParameters = z.infer<typeof RemoveScreenTabFieldParametersSchema>;

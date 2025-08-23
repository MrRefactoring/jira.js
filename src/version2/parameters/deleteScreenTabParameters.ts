import { z } from 'zod';

export const DeleteScreenTabParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The ID of the screen tab. */
  tabId: z.number().int(),
});

export type DeleteScreenTabParameters = z.infer<typeof DeleteScreenTabParametersSchema>;

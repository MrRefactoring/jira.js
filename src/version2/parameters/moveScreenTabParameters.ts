import { z } from 'zod';

export const MoveScreenTabParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The ID of the screen tab. */
  tabId: z.number().int(),
  /** The position of tab. The base index is 0. */
  pos: z.number().int(),
});

export type MoveScreenTabParameters = z.infer<typeof MoveScreenTabParametersSchema>;

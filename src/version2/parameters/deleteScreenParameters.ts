import { z } from 'zod';

export const DeleteScreenParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
});

export type DeleteScreenParameters = z.infer<typeof DeleteScreenParametersSchema>;

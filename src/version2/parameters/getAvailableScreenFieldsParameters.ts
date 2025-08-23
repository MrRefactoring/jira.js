import { z } from 'zod';

export const GetAvailableScreenFieldsParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
});

export type GetAvailableScreenFieldsParameters = z.infer<typeof GetAvailableScreenFieldsParametersSchema>;

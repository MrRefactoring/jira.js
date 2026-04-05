import { z } from 'zod';

export const GetConfigurationSchema = z.object({
  /** The ID of the board for which configuration is requested. */
  boardId: z.number(),
});

export type GetConfiguration = z.input<typeof GetConfigurationSchema>;

import { z } from 'zod';

export const GetBoardConfigurationSchema = z.object({
  /** The id of the board for which configuration is requested. */
  boardId: z.number(),
});

export type GetBoardConfiguration = z.input<typeof GetBoardConfigurationSchema>;

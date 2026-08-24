import { z } from 'zod';

export const GetBoardPropertyKeysSchema = z.object({
  /** The id of the board from which property keys will be returned. */
  boardId: z.number(),
});

export type GetBoardPropertyKeys = z.input<typeof GetBoardPropertyKeysSchema>;

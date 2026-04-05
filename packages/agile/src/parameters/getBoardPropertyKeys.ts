import { z } from 'zod';

export const GetBoardPropertyKeysSchema = z.object({
  /** The ID of the board from which property keys will be returned. */
  boardId: z.string(),
});

export type GetBoardPropertyKeys = z.input<typeof GetBoardPropertyKeysSchema>;

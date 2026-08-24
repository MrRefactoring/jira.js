import { z } from 'zod';

export const GetBoardPropertySchema = z.object({
  /** The key of the property to return. */
  propertyKey: z.string(),
  /** The id of the board from which the property will be returned. */
  boardId: z.number(),
});

export type GetBoardProperty = z.input<typeof GetBoardPropertySchema>;

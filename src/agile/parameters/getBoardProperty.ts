import { z } from 'zod';

export const GetBoardPropertySchema = z.object({
  /** The ID of the board from which the property will be returned. */
  boardId: z.string(),
  /** The key of the property to return. */
  propertyKey: z.string(),
});

export type GetBoardProperty = z.input<typeof GetBoardPropertySchema>;

import { z } from 'zod';

export const DeleteBoardPropertySchema = z.object({
  /** The key of the property to remove. */
  propertyKey: z.string(),
  /** The id of the board from which the property will be removed. */
  boardId: z.number(),
});

export type DeleteBoardProperty = z.input<typeof DeleteBoardPropertySchema>;

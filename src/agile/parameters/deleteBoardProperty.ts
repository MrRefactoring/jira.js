import { z } from 'zod';

export const DeleteBoardPropertySchema = z.object({
  /** The id of the board from which the property will be removed. */
  boardId: z.string(),
  /** The key of the property to remove. */
  propertyKey: z.string(),
});

export type DeleteBoardProperty = z.input<typeof DeleteBoardPropertySchema>;

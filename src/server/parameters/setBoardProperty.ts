import { z } from 'zod';

export const SetBoardPropertySchema = z.object({
  /** The key of the board's property. */
  propertyKey: z.string(),
  /** The id of the board on which the property will be set. */
  boardId: z.number(),
  body: z.record(z.string(), z.any()),
});

export type SetBoardProperty = z.input<typeof SetBoardPropertySchema>;

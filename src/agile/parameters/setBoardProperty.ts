import { z } from 'zod';

export const SetBoardPropertySchema = z.object({
  /** The ID of the board on which the property will be set. */
  boardId: z.string(),
  /** The key of the board's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string(),
  propertyValue: z.record(z.string(), z.any()),
});

export type SetBoardProperty = z.input<typeof SetBoardPropertySchema>;

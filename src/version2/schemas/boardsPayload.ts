import { z } from 'zod';
import { BoardPayloadSchema } from './boardPayload';

export const BoardsPayloadSchema = z.object({
  /** The boards to be associated with the project. */
  boards: z.array(BoardPayloadSchema).optional(),
});

export type BoardsPayload = z.infer<typeof BoardsPayloadSchema>;

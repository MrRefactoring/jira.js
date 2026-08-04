import { z } from 'zod';
import { apiObject } from '#/core';
import { BoardPayloadSchema } from './boardPayload';

export const BoardsPayloadSchema = apiObject({
  /** The boards to be associated with the project. */
  boards: z.array(BoardPayloadSchema).optional(),
});

export type BoardsPayload = z.infer<typeof BoardsPayloadSchema>;

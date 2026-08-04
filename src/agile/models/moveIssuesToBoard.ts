import { z } from 'zod';
import { apiObject } from '#/core';
import { EntrySchema } from './entry';

export const MoveIssuesToBoardSchema = apiObject({
  entries: z.array(EntrySchema).optional(),
});

export type MoveIssuesToBoard = z.infer<typeof MoveIssuesToBoardSchema>;

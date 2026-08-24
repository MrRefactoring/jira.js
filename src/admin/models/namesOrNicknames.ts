import { z } from 'zod';
import { apiObject } from '#/core';

export const NamesOrNicknamesSchema = apiObject({
  /** Names or nicknames filter */
  eq: z.array(z.string().max(100, 'eq must be at most 100 characters')).optional(),
  /** Partial name or nickname filter */
  contains: z.string().optional(),
});

export type NamesOrNicknames = z.infer<typeof NamesOrNicknamesSchema>;

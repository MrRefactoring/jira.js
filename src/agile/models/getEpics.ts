import { z } from 'zod';
import { apiObject } from '#/core';
import { EpicSchema } from './epic';

export const GetEpicsSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(EpicSchema).optional(),
});

export type GetEpics = z.infer<typeof GetEpicsSchema>;

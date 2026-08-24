import { z } from 'zod';
import { apiObject } from '#/core';
import { TransitionSchema } from './transition';

export const TransitionsMetaSchema = apiObject({
  transitions: z.array(TransitionSchema).optional(),
});

export type TransitionsMeta = z.infer<typeof TransitionsMetaSchema>;

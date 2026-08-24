import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusJsonSchema } from './statusJson';

export const TransitionSchema = apiObject({
  description: z.string().optional(),
  fields: z.record(z.string(), z.any()).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  opsbarSequence: z.number().optional(),
  to: StatusJsonSchema.optional(),
});

export type Transition = z.infer<typeof TransitionSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldMetaSchema } from './fieldMeta';
import { StatusJsonSchema } from './statusJson';

export const TransitionSchema = apiObject({
  description: z.string().optional(),
  fields: z.record(z.string(), FieldMetaSchema).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  opsbarSequence: z.number().optional(),
  to: StatusJsonSchema.optional(),
});

export type Transition = z.infer<typeof TransitionSchema>;

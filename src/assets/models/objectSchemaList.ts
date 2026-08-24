import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectSchemaSchema } from './objectSchema';

export const ObjectSchemaListSchema = apiObject({
  startAt: z.number(),
  maxResults: z.number(),
  total: z.number(),
  values: z.array(ObjectSchemaSchema),
  last: z.boolean().optional(),
  isLast: z.boolean().optional(),
});

export type ObjectSchemaList = z.infer<typeof ObjectSchemaListSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { JsonTypeSchema } from './jsonType';

export const FieldSchema = apiObject({
  clauseNames: z.array(z.string()).optional(),
  custom: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  navigable: z.boolean().optional(),
  orderable: z.boolean().optional(),
  schema: JsonTypeSchema.optional(),
  searchable: z.boolean().optional(),
});

export type Field = z.infer<typeof FieldSchema>;

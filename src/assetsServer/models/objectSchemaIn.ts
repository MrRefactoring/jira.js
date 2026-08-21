import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectSchemaInSchema = apiObject({
  name: z.string(),
  objectSchemaKey: z.string(),
  description: z.string().optional(),
});

export type ObjectSchemaIn = z.infer<typeof ObjectSchemaInSchema>;

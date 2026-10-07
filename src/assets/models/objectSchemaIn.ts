import { z } from 'zod';
import { apiObject } from '#/core';

/** Used to create object schema */
export const ObjectSchemaInSchema = apiObject({
  name: z.string(),
  displayName: z.string().max(50, 'displayName must be at most 50 characters').optional(),
  objectSchemaKey: z.string(),
  description: z.string().optional(),
});

export type ObjectSchemaIn = z.infer<typeof ObjectSchemaInSchema>;

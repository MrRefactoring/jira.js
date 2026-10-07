import { z } from 'zod';
import { apiObject } from '#/core';

/** Used to update object schema */
export const ObjectSchemaUpdateSchema = apiObject({
  name: z.string().optional(),
  displayName: z.string().max(50, 'displayName must be at most 50 characters').optional(),
  objectSchemaKey: z.string().optional(),
  description: z.string().optional(),
});

export type ObjectSchemaUpdate = z.infer<typeof ObjectSchemaUpdateSchema>;

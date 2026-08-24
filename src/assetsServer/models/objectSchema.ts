import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectSchemaSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
  objectSchemaKey: z.string().optional(),
  status: z.string().optional(),
  description: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  objectCount: z.number().optional(),
  archivedObjectCount: z.number().optional(),
  objectTypeCount: z.number().optional(),
});

export type ObjectSchema = z.infer<typeof ObjectSchemaSchema>;

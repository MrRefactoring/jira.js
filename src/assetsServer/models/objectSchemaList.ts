import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectSchemaSchema } from './objectSchema';

export const ObjectSchemaListSchema = apiObject({
  objectschemas: z.array(ObjectSchemaSchema).optional(),
});

export type ObjectSchemaList = z.infer<typeof ObjectSchemaListSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectAttributeValueInSchema } from './objectAttributeValueIn';

export const ObjectAttributeInSchema = apiObject({
  objectId: z.number().optional(),
  objectTypeAttributeId: z.number().optional(),
  objectAttributeValues: z.array(ObjectAttributeValueInSchema),
  operationType: z.number().optional(),
});

export type ObjectAttributeIn = z.infer<typeof ObjectAttributeInSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectTypeAttributeSchema, type ObjectTypeAttribute } from './objectTypeAttribute';
import { ObjectAttributeValueSchema, type ObjectAttributeValue } from './objectAttributeValue';

export interface ObjectAttribute {
  id?: number;
  objectTypeAttribute?: ObjectTypeAttribute;
  objectTypeAttributeId?: number;
  objectAttributeValues?: ObjectAttributeValue[];
  objectId?: number;
}

export const ObjectAttributeSchema: z.ZodType<ObjectAttribute> = apiObject({
  id: z.number().optional(),
  objectTypeAttribute: ObjectTypeAttributeSchema.optional(),
  objectTypeAttributeId: z.number().optional(),
  objectAttributeValues: z.array(z.lazy(() => ObjectAttributeValueSchema)).optional(),
  objectId: z.number().optional(),
});

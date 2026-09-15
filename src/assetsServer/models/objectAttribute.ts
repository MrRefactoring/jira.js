import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectTypeAttributeSchema, type ObjectTypeAttribute } from './objectTypeAttribute';
import {
  ObjectAttributeValueSchema,
  type ObjectAttributeValue,
  type ObjectAttributeValueInput,
} from './objectAttributeValue';

export interface ObjectAttribute {
  id?: number;
  objectTypeAttribute?: ObjectTypeAttribute;
  objectTypeAttributeId?: number;
  objectAttributeValues?: ObjectAttributeValue[];
  objectId?: number;
  [key: string]: unknown;
}

export interface ObjectAttributeInput {
  id?: number;
  objectTypeAttribute?: z.input<typeof ObjectTypeAttributeSchema>;
  objectTypeAttributeId?: number;
  objectAttributeValues?: ObjectAttributeValueInput[];
  objectId?: number;
}

export const ObjectAttributeSchema: z.ZodType<ObjectAttribute, ObjectAttributeInput> = apiObject({
  id: z.number().optional(),
  objectTypeAttribute: ObjectTypeAttributeSchema.optional(),
  objectTypeAttributeId: z.number().optional(),
  objectAttributeValues: z.array(z.lazy(() => ObjectAttributeValueSchema)).optional(),
  objectId: z.number().optional(),
});

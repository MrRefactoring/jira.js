import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectTypeAttributeSchema } from './objectTypeAttribute';
import { ObjectAttributeValueSchema } from './objectAttributeValue';
/** An object attribute as associated with an object */

export const ObjectAttributeSchema = apiObject({
  workspaceId: z.string(),
  objectTypeAttribute: ObjectTypeAttributeSchema.optional(),
  objectTypeAttributeId: z.string(),
  /**
   * The actual values of the object attribute. The size of the values array is determined by the cardinality
   * constraints on the object type attribute as well as how many values are associated with the object attribute
   */
  objectAttributeValues: z.array(ObjectAttributeValueSchema),
});

export type ObjectAttribute = z.infer<typeof ObjectAttributeSchema>;

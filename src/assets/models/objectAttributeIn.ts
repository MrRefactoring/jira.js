import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectAttributeValueInSchema } from './objectAttributeValueIn';
/** Object attribute used for creating and updating */

export const ObjectAttributeInSchema = apiObject({
  /** The type of the attribute. The type decides how this value should be interpreted */
  objectTypeAttributeId: z.string(),
  /** The value(s) */
  objectAttributeValues: z.array(ObjectAttributeValueInSchema),
});

export type ObjectAttributeIn = z.infer<typeof ObjectAttributeInSchema>;

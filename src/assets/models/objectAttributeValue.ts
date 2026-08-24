import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { GroupSchema } from './group';
import { StatusSchema } from './status';
/**
 * The actual value of an object attribute. The object attribute value body will have different properties populated
 * based on the type of the object type attribute. The value will always be present.
 */

export const ObjectAttributeValueSchema = apiObject({
  value: z.union([z.string(), z.coerce.date()]).optional(),
  /** The value as displayable text e.g. for a date time attribute this value will be formatted to the user settings */
  displayValue: z.string(),
  /** A value to use when searching for the specific object */
  searchValue: z.string().optional(),
  /** The same response body as an Assets object */
  referencedObject: z.record(z.string(), z.any()).optional(),
  user: UserSchema.optional(),
  group: GroupSchema.optional(),
  status: StatusSchema.optional(),
  additionalValue: z.string().optional(),
});

export type ObjectAttributeValue = z.infer<typeof ObjectAttributeValueSchema>;

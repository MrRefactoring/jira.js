import { z } from 'zod';
import { apiObject } from '#/core';
import { PropertyKeySchema } from './propertyKey';
/** List of property keys. */

export const PropertyKeysSchema = apiObject({
  /** Property key details. */
  keys: z.array(PropertyKeySchema).optional(),
});

export type PropertyKeys = z.infer<typeof PropertyKeysSchema>;

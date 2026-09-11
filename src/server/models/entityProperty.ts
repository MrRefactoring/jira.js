import { z } from 'zod';
import { apiObject } from '#/core';

export const EntityPropertySchema = apiObject({
  key: z.string().optional(),
  /** The value of the property. Any JSON. */
  value: z.unknown().optional(),
});

export type EntityProperty = z.infer<typeof EntityPropertySchema>;

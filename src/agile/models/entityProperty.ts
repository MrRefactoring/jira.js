import { z } from 'zod';
import { apiObject } from '#/core';

export const EntityPropertySchema = apiObject({
  /** The key of the property. */
  key: z.string(),
  /** The value of the property. */
  value: z.unknown(),
});

export type EntityProperty = z.infer<typeof EntityPropertySchema>;

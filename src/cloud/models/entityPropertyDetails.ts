import { z } from 'zod';
import { apiObject } from '#/core';

export const EntityPropertyDetailsSchema = apiObject({
  /** The entity property ID. */
  entityId: z.number(),
  /** The entity property key. */
  key: z.string(),
  /** The new value of the entity property. */
  value: z.string(),
});

export type EntityPropertyDetails = z.infer<typeof EntityPropertyDetailsSchema>;

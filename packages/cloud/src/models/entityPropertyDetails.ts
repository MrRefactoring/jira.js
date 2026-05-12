import { z } from 'zod';

export const EntityPropertyDetailsSchema = z.object({
  /** The entity property ID. */
  entityId: z.number(),
  /** The entity property key. */
  key: z.string(),
  /** The new value of the entity property. */
  value: z.string(),
});

export type EntityPropertyDetails = z.infer<typeof EntityPropertyDetailsSchema>;

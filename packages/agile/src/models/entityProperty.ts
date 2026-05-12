import { z } from 'zod';

export const EntityPropertySchema = z.object({
  /** The key of the property. */
  key: z.string(),
  /** The value of the property. */
  value: z.unknown(),
});

export type EntityProperty = z.infer<typeof EntityPropertySchema>;

import { z } from 'zod';
import { PropertyKeySchema } from './propertyKey';

/** List of property keys. */
export const PropertyKeysSchema = z.object({
  /** Property key details. */
  keys: z.array(PropertyKeySchema).optional(),
});

export type PropertyKeys = z.infer<typeof PropertyKeysSchema>;

import { z } from 'zod';

/** Property key details. */
export const PropertyKeySchema = z.object({
  /** The key of the property. */
  key: z.string().optional(),
  /** The URL of the property. */
  self: z.string().optional(),
});

export type PropertyKey = z.infer<typeof PropertyKeySchema>;

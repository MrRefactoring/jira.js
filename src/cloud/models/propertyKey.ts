import { z } from 'zod';
import { apiObject } from '#/core';
/** Property key details. */

export const PropertyKeySchema = apiObject({
  /** The key of the property. */
  key: z.string().optional(),
  /** The URL of the property. */
  self: z.string().optional(),
});

export type PropertyKey = z.infer<typeof PropertyKeySchema>;

import { z } from 'zod';
import { apiObject } from '#/core';

export const PropertyKeysSchema = apiObject({
  keys: z
    .array(
      apiObject({
        /** The URL of the property. */
        self: z.string().optional(),
        /** The key of the property. */
        key: z.string().optional(),
      }),
    )
    .optional(),
});

export type PropertyKeys = z.infer<typeof PropertyKeysSchema>;

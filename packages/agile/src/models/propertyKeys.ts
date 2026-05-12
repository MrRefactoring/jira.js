import { z } from 'zod';

export const PropertyKeysSchema = z.object({
  keys: z
    .array(
      z.object({
        /** The URL of the property. */
        self: z.string().optional(),
        /** The key of the property. */
        key: z.string().optional(),
      }),
    )
    .optional(),
});

export type PropertyKeys = z.infer<typeof PropertyKeysSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';

export const GetForgeAppPropertyKeysSchema = apiObject({
  keys: z
    .array(
      apiObject({
        key: z.string().optional(),
        self: z.string().optional(),
      }),
    )
    .optional(),
});

export type GetForgeAppPropertyKeys = z.infer<typeof GetForgeAppPropertyKeysSchema>;

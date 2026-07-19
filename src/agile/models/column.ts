import { z } from 'zod';
import { apiObject } from '#/core';

export const ColumnSchema = apiObject({
  max: z.number().optional(),
  min: z.number().optional(),
  name: z.string().optional(),
  statuses: z
    .array(
      apiObject({
        id: z.string().optional(),
        self: z.string().url().optional(),
      }),
    )
    .optional(),
});

export type Column = z.infer<typeof ColumnSchema>;

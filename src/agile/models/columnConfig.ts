import { z } from 'zod';
import { apiObject } from '#/core';

export const ColumnConfigSchema = apiObject({
  columns: z
    .array(
      apiObject({
        max: z.number().optional(),
        min: z.number().optional(),
        name: z.string().optional(),
        statuses: z
          .array(
            apiObject({
              id: z.string().optional(),
              self: z.url().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
  constraintType: z.string().optional(),
});

export type ColumnConfig = z.infer<typeof ColumnConfigSchema>;

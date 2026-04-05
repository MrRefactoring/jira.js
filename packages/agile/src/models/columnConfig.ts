import { z } from 'zod';

export const ColumnConfigSchema = z.object({
  columns: z
    .array(
      z.object({
        max: z.number().optional(),
        min: z.number().optional(),
        name: z.string().optional(),
        statuses: z
          .array(
            z.object({
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

import { z } from 'zod';

export const ColumnSchema = z.object({
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
});

export type Column = z.infer<typeof ColumnSchema>;

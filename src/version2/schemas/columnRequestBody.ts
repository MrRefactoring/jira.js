import { z } from 'zod';

export const ColumnRequestBodySchema = z.object({
  columns: z.array(z.string()).optional(),
});

export type ColumnRequestBody = z.infer<typeof ColumnRequestBodySchema>;

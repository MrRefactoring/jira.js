import { z } from 'zod';
import { apiObject } from '#/core';

export const ColumnsSchema = apiObject({
  columns: z.array(z.string()).optional(),
});

export type Columns = z.infer<typeof ColumnsSchema>;

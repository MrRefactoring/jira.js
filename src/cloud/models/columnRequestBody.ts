import { z } from 'zod';
import { apiObject } from '#/core';

export const ColumnRequestBodySchema = apiObject({
  columns: z.array(z.string()).optional(),
});

export type ColumnRequestBody = z.infer<typeof ColumnRequestBodySchema>;

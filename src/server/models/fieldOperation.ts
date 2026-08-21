import { z } from 'zod';
import { apiObject } from '#/core';

export const FieldOperationSchema = apiObject({
  operation: z.string().optional(),
  value: z.record(z.string(), z.any()).optional(),
});

export type FieldOperation = z.infer<typeof FieldOperationSchema>;

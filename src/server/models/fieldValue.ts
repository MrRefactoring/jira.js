import { z } from 'zod';
import { apiObject } from '#/core';

export const FieldValueSchema = apiObject({
  fieldId: z.string().optional(),
  value: z.record(z.string(), z.any()).optional(),
});

export type FieldValue = z.infer<typeof FieldValueSchema>;

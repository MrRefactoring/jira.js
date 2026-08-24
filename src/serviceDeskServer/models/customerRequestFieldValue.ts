import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerRequestFieldValueSchema = apiObject({
  fieldId: z.string().optional(),
  label: z.string().optional(),
  value: z.record(z.string(), z.any()).optional(),
  renderedValue: z.record(z.string(), z.any()).optional(),
});

export type CustomerRequestFieldValue = z.infer<typeof CustomerRequestFieldValueSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerRequestFieldValueSchema = apiObject({
  fieldId: z.string().optional(),
  label: z.string().optional(),
  value: z.unknown().optional(),
  renderedValue: z.unknown().optional(),
});

export type CustomerRequestFieldValue = z.infer<typeof CustomerRequestFieldValueSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerRequestFieldValueSchema = apiObject({
  /** ID of the field. */
  fieldId: z.string().optional(),
  /** Text label for the field. */
  label: z.string().optional(),
  /** Value of the field rendered in the UI. */
  renderedValue: z.record(z.string(), z.any()).optional(),
  /** Value of the field. */
  value: z.unknown().optional(),
});

export type CustomerRequestFieldValue = z.infer<typeof CustomerRequestFieldValueSchema>;

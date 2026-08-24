import { z } from 'zod';
import { apiObject } from '#/core';
import { JsonTypeSchema } from './jsonType';

export const FieldMetaSchema = apiObject({
  allowedValues: z.array(z.record(z.string(), z.any())).optional(),
  autoCompleteUrl: z.string().optional(),
  defaultValue: z.record(z.string(), z.any()).optional(),
  fieldId: z.string().optional(),
  hasDefaultValue: z.boolean().optional(),
  name: z.string().optional(),
  operations: z.array(z.string()).optional(),
  required: z.boolean().optional(),
  schema: JsonTypeSchema.optional(),
});

export type FieldMeta = z.infer<typeof FieldMetaSchema>;

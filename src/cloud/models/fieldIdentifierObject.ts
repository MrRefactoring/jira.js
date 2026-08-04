import { z } from 'zod';
import { apiObject } from '#/core';
/** Identifier for a field for example FIELD_ID. */

export const FieldIdentifierObjectSchema = apiObject({
  identifier: z.record(z.string(), z.any()).optional(),
  type: z.string(),
});

export type FieldIdentifierObject = z.infer<typeof FieldIdentifierObjectSchema>;

import { z } from 'zod';

/** Identifier for a field for example FIELD_ID. */
export const FieldIdentifierObjectSchema = z.object({
  identifier: z.record(z.string(), z.any()).optional(),
  type: z.string(),
});

export type FieldIdentifierObject = z.infer<typeof FieldIdentifierObjectSchema>;

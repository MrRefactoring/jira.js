import { z } from 'zod';

/** Identifier for a field for example FIELD_ID. */
export const FieldIdentifierObjectSchema = z.object({
  identifier: z.object({}).optional(),
  type: z.string(),
});

export type FieldIdentifierObject = z.infer<typeof FieldIdentifierObjectSchema>;

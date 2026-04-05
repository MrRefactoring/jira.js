import { z } from 'zod';

/** Partial failure result when updating field scheme to fields associations. */
export const FieldSchemeToFieldsPartialFailureSchema = z.object({
  error: z.string().optional(),
  fieldId: z.string(),
  schemeId: z.number(),
  success: z.boolean(),
  workTypeIds: z.array(z.number()),
});

export type FieldSchemeToFieldsPartialFailure = z.infer<typeof FieldSchemeToFieldsPartialFailureSchema>;

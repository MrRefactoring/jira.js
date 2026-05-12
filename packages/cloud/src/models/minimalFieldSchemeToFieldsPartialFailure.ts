import { z } from 'zod';

/** Minimal partial failure result when updating field scheme to fields associations. */
export const MinimalFieldSchemeToFieldsPartialFailureSchema = z.object({
  error: z.string().optional(),
  fieldId: z.string(),
  schemeId: z.number(),
  success: z.boolean(),
});

export type MinimalFieldSchemeToFieldsPartialFailure = z.infer<typeof MinimalFieldSchemeToFieldsPartialFailureSchema>;

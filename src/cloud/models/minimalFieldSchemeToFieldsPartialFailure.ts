import { z } from 'zod';
import { apiObject } from '#/core';
/** Minimal partial failure result when updating field scheme to fields associations. */

export const MinimalFieldSchemeToFieldsPartialFailureSchema = apiObject({
  error: z.string().optional(),
  fieldId: z.string(),
  schemeId: z.number(),
  success: z.boolean(),
});

export type MinimalFieldSchemeToFieldsPartialFailure = z.infer<typeof MinimalFieldSchemeToFieldsPartialFailureSchema>;

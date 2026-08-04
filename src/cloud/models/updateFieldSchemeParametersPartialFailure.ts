import { z } from 'zod';
import { apiObject } from '#/core';
/** Result of updating field scheme parameters for a specific field, scheme, and optional work type. */

export const UpdateFieldSchemeParametersPartialFailureSchema = apiObject({
  error: z.string().optional(),
  fieldId: z.string(),
  schemeId: z.number(),
  success: z.boolean(),
  workTypeId: z.number().optional(),
});

export type UpdateFieldSchemeParametersPartialFailure = z.infer<typeof UpdateFieldSchemeParametersPartialFailureSchema>;

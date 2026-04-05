import { z } from 'zod';

/** Result of updating field scheme parameters for a specific field, scheme, and optional work type. */
export const UpdateFieldSchemeParametersPartialFailureSchema = z.object({
  error: z.string().optional(),
  fieldId: z.string(),
  schemeId: z.number(),
  success: z.boolean(),
  workTypeId: z.number().optional(),
});

export type UpdateFieldSchemeParametersPartialFailure = z.infer<typeof UpdateFieldSchemeParametersPartialFailureSchema>;

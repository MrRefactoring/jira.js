import { z } from 'zod';
import { RemoveFieldParametersResultErrorSchema } from '#/models/removeFieldParametersResultError';

export const SuccessOrErrorResultsSchema = z.object({
  error: RemoveFieldParametersResultErrorSchema.optional(),
  fieldId: z.string().optional(),
  schemeId: z.number().optional(),
  success: z.boolean().optional(),
  workTypeIds: z.array(z.number()).optional(),
});

export type SuccessOrErrorResults = z.infer<typeof SuccessOrErrorResultsSchema>;

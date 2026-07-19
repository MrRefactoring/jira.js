import { z } from 'zod';
import { apiObject } from '#/core';
import { RemoveFieldParametersResultErrorSchema } from './removeFieldParametersResultError';

export const SuccessOrErrorResultsSchema = apiObject({
  error: RemoveFieldParametersResultErrorSchema.optional(),
  fieldId: z.string().optional(),
  schemeId: z.number().optional(),
  success: z.boolean().optional(),
  workTypeIds: z.array(z.number()).optional(),
});

export type SuccessOrErrorResults = z.infer<typeof SuccessOrErrorResultsSchema>;

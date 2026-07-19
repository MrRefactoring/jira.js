import { z } from 'zod';
import { apiObject } from '#/core';
import { SuccessOrErrorResultsSchema } from './successOrErrorResults';
/** Result of remove field parameters operation. */

export const RemoveFieldParametersResultSchema = apiObject({
  results: z.array(SuccessOrErrorResultsSchema).optional(),
});

export type RemoveFieldParametersResult = z.infer<typeof RemoveFieldParametersResultSchema>;

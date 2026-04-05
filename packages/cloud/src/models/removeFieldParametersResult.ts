import { z } from 'zod';
import { SuccessOrErrorResultsSchema } from '#/models/successOrErrorResults';

/** Result of remove field parameters operation. */
export const RemoveFieldParametersResultSchema = z.object({
  results: z.array(SuccessOrErrorResultsSchema).optional(),
});

export type RemoveFieldParametersResult = z.infer<typeof RemoveFieldParametersResultSchema>;

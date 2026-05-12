import { z } from 'zod';
import { MinimalFieldSchemeToFieldsPartialFailureSchema } from '#/models/minimalFieldSchemeToFieldsPartialFailure';

/** Minimal response for updating field scheme to fields associations. */
export const MinimalFieldSchemeToFieldsResponseSchema = z.object({
  results: z.array(MinimalFieldSchemeToFieldsPartialFailureSchema),
});

export type MinimalFieldSchemeToFieldsResponse = z.infer<typeof MinimalFieldSchemeToFieldsResponseSchema>;

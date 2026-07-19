import { z } from 'zod';
import { apiObject } from '#/core';
import { MinimalFieldSchemeToFieldsPartialFailureSchema } from './minimalFieldSchemeToFieldsPartialFailure';
/** Minimal response for updating field scheme to fields associations. */

export const MinimalFieldSchemeToFieldsResponseSchema = apiObject({
  results: z.array(MinimalFieldSchemeToFieldsPartialFailureSchema),
});

export type MinimalFieldSchemeToFieldsResponse = z.infer<typeof MinimalFieldSchemeToFieldsResponseSchema>;

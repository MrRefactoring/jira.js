import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldSchemeToFieldsPartialFailureSchema } from './fieldSchemeToFieldsPartialFailure';
/** Response for updating field associations. */

export const FieldSchemeToFieldsResponseSchema = apiObject({
  results: z.array(FieldSchemeToFieldsPartialFailureSchema),
});

export type FieldSchemeToFieldsResponse = z.infer<typeof FieldSchemeToFieldsResponseSchema>;

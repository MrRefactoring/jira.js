import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldSchemeToProjectsPartialFailureSchema } from './fieldSchemeToProjectsPartialFailure';
/** Response for updating field scheme to projects associations. */

export const FieldSchemeToProjectsResponseSchema = apiObject({
  results: z.array(FieldSchemeToProjectsPartialFailureSchema),
});

export type FieldSchemeToProjectsResponse = z.infer<typeof FieldSchemeToProjectsResponseSchema>;

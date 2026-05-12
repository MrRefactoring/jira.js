import { z } from 'zod';
import { FieldSchemeToProjectsPartialFailureSchema } from '#/models/fieldSchemeToProjectsPartialFailure';

/** Response for updating field scheme to projects associations. */
export const FieldSchemeToProjectsResponseSchema = z.object({
  results: z.array(FieldSchemeToProjectsPartialFailureSchema),
});

export type FieldSchemeToProjectsResponse = z.infer<typeof FieldSchemeToProjectsResponseSchema>;

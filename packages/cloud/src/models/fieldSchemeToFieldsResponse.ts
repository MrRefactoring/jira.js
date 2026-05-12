import { z } from 'zod';
import { FieldSchemeToFieldsPartialFailureSchema } from '#/models/fieldSchemeToFieldsPartialFailure';

/** Response for updating field associations. */
export const FieldSchemeToFieldsResponseSchema = z.object({
  results: z.array(FieldSchemeToFieldsPartialFailureSchema),
});

export type FieldSchemeToFieldsResponse = z.infer<typeof FieldSchemeToFieldsResponseSchema>;

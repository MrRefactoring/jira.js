import { z } from 'zod';
import { UpdateFieldSchemeParametersPartialFailureSchema } from '#/models/updateFieldSchemeParametersPartialFailure';

/** Response bean for field scheme parameter update operations. */
export const UpdateFieldSchemeParametersResponseSchema = z.object({
  results: z.array(UpdateFieldSchemeParametersPartialFailureSchema),
});

export type UpdateFieldSchemeParametersResponse = z.infer<typeof UpdateFieldSchemeParametersResponseSchema>;

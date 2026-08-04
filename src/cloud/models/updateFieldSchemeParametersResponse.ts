import { z } from 'zod';
import { apiObject } from '#/core';
import { UpdateFieldSchemeParametersPartialFailureSchema } from './updateFieldSchemeParametersPartialFailure';
/** Response bean for field scheme parameter update operations. */

export const UpdateFieldSchemeParametersResponseSchema = apiObject({
  results: z.array(UpdateFieldSchemeParametersPartialFailureSchema),
});

export type UpdateFieldSchemeParametersResponse = z.infer<typeof UpdateFieldSchemeParametersResponseSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
/** Error during remove field parameters operation. */

export const RemoveFieldParametersResultErrorSchema = apiObject({
  code: z.string().optional(),
  message: z.string().optional(),
});

export type RemoveFieldParametersResultError = z.infer<typeof RemoveFieldParametersResultErrorSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationErrorSchema } from './applicationError';
/** Organization not found */

export const OrgNotFoundErrorSchema = apiObject({
  errors: z.array(ApplicationErrorSchema.optional()).optional(),
});

export type OrgNotFoundError = z.infer<typeof OrgNotFoundErrorSchema>;

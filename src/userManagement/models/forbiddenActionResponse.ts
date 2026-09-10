import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ManageabilityUnallowedSchema } from './manageabilityUnallowed';

export const ForbiddenActionResponseSchema = apiObject({
  key: openEnum(['forbidden.action']),
  context: ManageabilityUnallowedSchema,
});

export type ForbiddenActionResponse = z.infer<typeof ForbiddenActionResponseSchema>;

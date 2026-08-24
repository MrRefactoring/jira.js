import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ManageabilityRuleObjectMutabilitySchema } from './manageabilityRuleObjectMutability';

export const ObjectMutabilityResponseSchema = apiObject({
  key: openEnum(['forbidden.fieldMutation']),
  context: ManageabilityRuleObjectMutabilitySchema,
});

export type ObjectMutabilityResponse = z.infer<typeof ObjectMutabilityResponseSchema>;

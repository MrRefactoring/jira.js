import type { z } from 'zod';
import { apiObject } from '#/core';
import { PolicyUpdateModelSchema } from './policyUpdateModel';

export const PolicyUpdateInputSchema = apiObject({
  data: PolicyUpdateModelSchema.optional(),
});

export type PolicyUpdateInput = z.infer<typeof PolicyUpdateInputSchema>;

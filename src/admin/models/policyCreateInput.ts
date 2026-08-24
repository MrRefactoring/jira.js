import type { z } from 'zod';
import { apiObject } from '#/core';
import { PolicyCreateModelSchema } from './policyCreateModel';

export const PolicyCreateInputSchema = apiObject({
  data: PolicyCreateModelSchema.optional(),
});

export type PolicyCreateInput = z.infer<typeof PolicyCreateInputSchema>;

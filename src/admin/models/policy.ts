import type { z } from 'zod';
import { apiObject } from '#/core';
import { PolicyModelSchema } from './policyModel';

export const PolicySchema = apiObject({
  data: PolicyModelSchema.optional(),
});

export type Policy = z.infer<typeof PolicySchema>;

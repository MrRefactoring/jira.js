import { z } from 'zod';
import { apiObject } from '#/core';

export const ValidatePolicyRequestSchema = apiObject({
  policyIds: z.array(z.string()).optional(),
});

export type ValidatePolicyRequest = z.infer<typeof ValidatePolicyRequestSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';

export const SetProjectPoliciesRequestSchema = apiObject({
  policyIds: z.array(z.string()).optional(),
});

export type SetProjectPoliciesRequest = z.infer<typeof SetProjectPoliciesRequestSchema>;

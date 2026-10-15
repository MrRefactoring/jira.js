import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkProjectPolicyRequestSchema = apiObject({
  projectIds: z.array(z.number()).optional(),
});

export type BulkProjectPolicyRequest = z.infer<typeof BulkProjectPolicyRequestSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectResultSchema } from './projectResult';

export const BulkPolicyOperationResponseSchema = apiObject({
  failed: z.array(ProjectResultSchema).optional(),
  successful: z.array(ProjectResultSchema).optional(),
});

export type BulkPolicyOperationResponse = z.infer<typeof BulkPolicyOperationResponseSchema>;

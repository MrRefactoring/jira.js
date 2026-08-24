import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ReindexRequestSchema = apiObject({
  completionTime: z.coerce.date().optional(),
  id: z.number().optional(),
  requestTime: z.coerce.date().optional(),
  startTime: z.coerce.date().optional(),
  status: openEnum(['PENDING', 'ACTIVE', 'RUNNING', 'FAILED', 'COMPLETE']).optional(),
  type: openEnum(['IMMEDIATE', 'DELAYED']).optional(),
});

export type ReindexRequest = z.infer<typeof ReindexRequestSchema>;

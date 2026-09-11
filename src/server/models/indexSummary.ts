import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueIndexSummarySchema } from './issueIndexSummary';

export const IndexSummarySchema = apiObject({
  externalPlatformIndexReplay: z.record(z.string(), z.any()).optional(),
  issueIndex: IssueIndexSummarySchema.optional(),
  nodeId: z.string().optional(),
  replicationQueues: z.record(z.string(), z.any()).optional(),
  reportTime: z.coerce.date().optional(),
});

export type IndexSummary = z.infer<typeof IndexSummarySchema>;

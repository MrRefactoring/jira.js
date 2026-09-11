import { z } from 'zod';
import { apiObject } from '#/core';
import { ExternalPlatformIndexReplaySummarySchema } from './externalPlatformIndexReplaySummary';
import { IssueIndexSummarySchema } from './issueIndexSummary';
import { IndexReplicationQueueSummarySchema } from './indexReplicationQueueSummary';

export const IndexSummarySchema = apiObject({
  externalPlatformIndexReplay: z.record(z.string(), ExternalPlatformIndexReplaySummarySchema).optional(),
  issueIndex: IssueIndexSummarySchema.optional(),
  nodeId: z.string().optional(),
  replicationQueues: z.record(z.string(), IndexReplicationQueueSummarySchema).optional(),
  reportTime: z.coerce.date().optional(),
});

export type IndexSummary = z.infer<typeof IndexSummarySchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { ExternalPlatformIndexReplayEntrySchema } from './externalPlatformIndexReplayEntry';

export const ExternalPlatformIndexReplaySummarySchema = apiObject({
  lastConsumedOperation: ExternalPlatformIndexReplayEntrySchema.optional(),
  lastOperationInQueue: ExternalPlatformIndexReplayEntrySchema.optional(),
  queueSize: z.number().optional(),
});

export type ExternalPlatformIndexReplaySummary = z.infer<typeof ExternalPlatformIndexReplaySummarySchema>;

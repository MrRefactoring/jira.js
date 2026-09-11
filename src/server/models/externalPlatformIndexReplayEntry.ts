import { z } from 'zod';
import { apiObject } from '#/core';

export const ExternalPlatformIndexReplayEntrySchema = apiObject({
  id: z.number().optional(),
  journalWriteTime: z.coerce.date().optional(),
});

export type ExternalPlatformIndexReplayEntry = z.infer<typeof ExternalPlatformIndexReplayEntrySchema>;

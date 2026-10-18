import { z } from 'zod';
import { apiObject } from '#/core';

export const QueueCountSettingsSchema = apiObject({
  includeQueueCount: z.boolean(),
  useCachedQueueCount: z.boolean(),
});

export type QueueCountSettings = z.infer<typeof QueueCountSettingsSchema>;

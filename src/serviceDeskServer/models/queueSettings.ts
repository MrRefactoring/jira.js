import type { z } from 'zod';
import { apiObject } from '#/core';
import { QueueCountSettingsSchema } from './queueCountSettings';

export const QueueSettingsSchema = apiObject({
  queueCount: QueueCountSettingsSchema,
});

export type QueueSettings = z.infer<typeof QueueSettingsSchema>;

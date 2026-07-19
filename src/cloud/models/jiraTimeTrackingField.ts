import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraTimeTrackingFieldSchema = apiObject({
  timeRemaining: z.string(),
});

export type JiraTimeTrackingField = z.infer<typeof JiraTimeTrackingFieldSchema>;

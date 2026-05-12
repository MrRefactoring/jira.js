import { z } from 'zod';

export const JiraTimeTrackingFieldSchema = z.object({
  timeRemaining: z.string(),
});

export type JiraTimeTrackingField = z.infer<typeof JiraTimeTrackingFieldSchema>;

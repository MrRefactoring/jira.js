import { z } from 'zod';

export const SetShouldQueuesUseCountCacheGloballySchema = z.object({
  body: z.boolean().optional(),
});

export type SetShouldQueuesUseCountCacheGlobally = z.input<typeof SetShouldQueuesUseCountCacheGloballySchema>;

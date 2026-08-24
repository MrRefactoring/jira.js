import { z } from 'zod';

export const SetShouldQueuesIncludeCountGloballySchema = z.object({
  body: z.boolean().optional(),
});

export type SetShouldQueuesIncludeCountGlobally = z.input<typeof SetShouldQueuesIncludeCountGloballySchema>;

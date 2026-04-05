import { z } from 'zod';

export const JiraStatusInputSchema = z.object({
  statusId: z.string(),
});

export type JiraStatusInput = z.infer<typeof JiraStatusInputSchema>;

import { z } from 'zod';

export const JiraGroupInputSchema = z.object({
  groupName: z.string(),
});

export type JiraGroupInput = z.infer<typeof JiraGroupInputSchema>;

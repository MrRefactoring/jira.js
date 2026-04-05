import { z } from 'zod';

export const JiraUserFieldSchema = z.object({
  accountId: z.string(),
});

export type JiraUserField = z.infer<typeof JiraUserFieldSchema>;

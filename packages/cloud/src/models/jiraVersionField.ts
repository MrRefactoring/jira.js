import { z } from 'zod';

export const JiraVersionFieldSchema = z.object({
  versionId: z.string().optional(),
});

export type JiraVersionField = z.infer<typeof JiraVersionFieldSchema>;

import { z } from 'zod';

export const JiraUrlFieldSchema = z.object({
  fieldId: z.string(),
  url: z.string(),
});

export type JiraUrlField = z.infer<typeof JiraUrlFieldSchema>;

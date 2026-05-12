import { z } from 'zod';

export const JiraComponentFieldSchema = z.object({
  componentId: z.number(),
});

export type JiraComponentField = z.infer<typeof JiraComponentFieldSchema>;

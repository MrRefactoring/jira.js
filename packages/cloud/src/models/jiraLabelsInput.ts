import { z } from 'zod';

export const JiraLabelsInputSchema = z.object({
  name: z.string(),
});

export type JiraLabelsInput = z.infer<typeof JiraLabelsInputSchema>;

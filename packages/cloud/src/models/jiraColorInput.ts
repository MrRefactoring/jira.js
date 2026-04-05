import { z } from 'zod';

export const JiraColorInputSchema = z.object({
  name: z.string(),
});

export type JiraColorInput = z.infer<typeof JiraColorInputSchema>;

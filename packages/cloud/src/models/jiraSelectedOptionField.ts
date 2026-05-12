import { z } from 'zod';

export const JiraSelectedOptionFieldSchema = z.object({
  optionId: z.number().optional(),
});

export type JiraSelectedOptionField = z.infer<typeof JiraSelectedOptionFieldSchema>;

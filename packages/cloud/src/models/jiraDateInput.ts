import { z } from 'zod';

export const JiraDateInputSchema = z.object({
  formattedDate: z.string(),
});

export type JiraDateInput = z.infer<typeof JiraDateInputSchema>;

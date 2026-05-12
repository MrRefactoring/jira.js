import { z } from 'zod';

export const JiraDateTimeInputSchema = z.object({
  formattedDateTime: z.string(),
});

export type JiraDateTimeInput = z.infer<typeof JiraDateTimeInputSchema>;

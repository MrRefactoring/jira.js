import { z } from 'zod';
import { JiraDateTimeInputSchema } from '#/models/jiraDateTimeInput';

export const JiraDateTimeFieldSchema = z.object({
  dateTime: JiraDateTimeInputSchema,
  fieldId: z.string(),
});

export type JiraDateTimeField = z.infer<typeof JiraDateTimeFieldSchema>;

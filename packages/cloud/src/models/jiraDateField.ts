import { z } from 'zod';
import { JiraDateInputSchema } from '#/models/jiraDateInput';

export const JiraDateFieldSchema = z.object({
  date: JiraDateInputSchema.optional(),
  fieldId: z.string(),
});

export type JiraDateField = z.infer<typeof JiraDateFieldSchema>;

import { z } from 'zod';
import { JiraSelectedOptionFieldSchema } from '#/models/jiraSelectedOptionField';

export const JiraMultipleSelectFieldSchema = z.object({
  fieldId: z.string(),
  options: z.array(JiraSelectedOptionFieldSchema),
});

export type JiraMultipleSelectField = z.infer<typeof JiraMultipleSelectFieldSchema>;

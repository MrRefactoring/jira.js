import { z } from 'zod';
import { JiraUserFieldSchema } from '#/models/jiraUserField';

export const JiraMultipleSelectUserPickerFieldSchema = z.object({
  fieldId: z.string(),
  users: z.array(JiraUserFieldSchema).optional(),
});

export type JiraMultipleSelectUserPickerField = z.infer<typeof JiraMultipleSelectUserPickerFieldSchema>;

import { z } from 'zod';
import { JiraUserFieldSchema } from '#/models/jiraUserField';

export const JiraSingleSelectUserPickerFieldSchema = z.object({
  fieldId: z.string(),
  user: JiraUserFieldSchema.optional(),
});

export type JiraSingleSelectUserPickerField = z.infer<typeof JiraSingleSelectUserPickerFieldSchema>;

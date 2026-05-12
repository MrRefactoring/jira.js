import { z } from 'zod';
import { JiraVersionFieldSchema } from '#/models/jiraVersionField';

export const JiraSingleVersionPickerFieldSchema = z.object({
  fieldId: z.string(),
  version: JiraVersionFieldSchema,
});

export type JiraSingleVersionPickerField = z.infer<typeof JiraSingleVersionPickerFieldSchema>;

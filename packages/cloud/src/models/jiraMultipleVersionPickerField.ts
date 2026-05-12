import { z } from 'zod';
import { JiraVersionFieldSchema } from '#/models/jiraVersionField';

export const JiraMultipleVersionPickerFieldSchema = z.object({
  bulkEditMultiSelectFieldOption: z.enum(['ADD', 'REMOVE', 'REPLACE', 'REMOVE_ALL']),
  fieldId: z.string(),
  versions: z.array(JiraVersionFieldSchema),
});

export type JiraMultipleVersionPickerField = z.infer<typeof JiraMultipleVersionPickerFieldSchema>;

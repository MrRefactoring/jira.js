import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraVersionFieldSchema } from './jiraVersionField';

export const JiraMultipleVersionPickerFieldSchema = apiObject({
  bulkEditMultiSelectFieldOption: z.enum(['ADD', 'REMOVE', 'REPLACE', 'REMOVE_ALL']),
  fieldId: z.string(),
  versions: z.array(JiraVersionFieldSchema),
});

export type JiraMultipleVersionPickerField = z.infer<typeof JiraMultipleVersionPickerFieldSchema>;

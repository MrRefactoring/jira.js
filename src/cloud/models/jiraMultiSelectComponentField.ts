import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { JiraComponentFieldSchema } from './jiraComponentField';

export const JiraMultiSelectComponentFieldSchema = apiObject({
  bulkEditMultiSelectFieldOption: openEnum(['ADD', 'REMOVE', 'REPLACE', 'REMOVE_ALL']),
  components: z.array(JiraComponentFieldSchema),
  fieldId: z.string(),
});

export type JiraMultiSelectComponentField = z.infer<typeof JiraMultiSelectComponentFieldSchema>;

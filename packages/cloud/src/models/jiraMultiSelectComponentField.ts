import { z } from 'zod';
import { JiraComponentFieldSchema } from '#/models/jiraComponentField';

export const JiraMultiSelectComponentFieldSchema = z.object({
  bulkEditMultiSelectFieldOption: z.enum(['ADD', 'REMOVE', 'REPLACE', 'REMOVE_ALL']),
  components: z.array(JiraComponentFieldSchema),
  fieldId: z.string(),
});

export type JiraMultiSelectComponentField = z.infer<typeof JiraMultiSelectComponentFieldSchema>;

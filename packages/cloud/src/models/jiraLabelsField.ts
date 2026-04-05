import { z } from 'zod';
import { JiraLabelPropertiesInputJackson1Schema } from '#/models/jiraLabelPropertiesInputJackson1';
import { JiraLabelsInputSchema } from '#/models/jiraLabelsInput';

export const JiraLabelsFieldSchema = z.object({
  bulkEditMultiSelectFieldOption: z.enum(['ADD', 'REMOVE', 'REPLACE', 'REMOVE_ALL']),
  fieldId: z.string(),
  labelProperties: z.array(JiraLabelPropertiesInputJackson1Schema).optional(),
  labels: z.array(JiraLabelsInputSchema),
});

export type JiraLabelsField = z.infer<typeof JiraLabelsFieldSchema>;

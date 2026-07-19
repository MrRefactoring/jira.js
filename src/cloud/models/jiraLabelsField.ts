import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraLabelPropertiesInputJackson1Schema } from './jiraLabelPropertiesInputJackson1';
import { JiraLabelsInputSchema } from './jiraLabelsInput';

export const JiraLabelsFieldSchema = apiObject({
  bulkEditMultiSelectFieldOption: z.enum(['ADD', 'REMOVE', 'REPLACE', 'REMOVE_ALL']),
  fieldId: z.string(),
  labelProperties: z.array(JiraLabelPropertiesInputJackson1Schema).optional(),
  labels: z.array(JiraLabelsInputSchema),
});

export type JiraLabelsField = z.infer<typeof JiraLabelsFieldSchema>;

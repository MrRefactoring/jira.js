import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraGroupInputSchema } from './jiraGroupInput';

export const JiraMultipleGroupPickerFieldSchema = apiObject({
  fieldId: z.string(),
  groups: z.array(JiraGroupInputSchema),
});

export type JiraMultipleGroupPickerField = z.infer<typeof JiraMultipleGroupPickerFieldSchema>;

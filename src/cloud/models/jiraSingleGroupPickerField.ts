import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraGroupInputSchema } from './jiraGroupInput';

export const JiraSingleGroupPickerFieldSchema = apiObject({
  fieldId: z.string(),
  group: JiraGroupInputSchema,
});

export type JiraSingleGroupPickerField = z.infer<typeof JiraSingleGroupPickerFieldSchema>;

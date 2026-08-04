import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraUserFieldSchema } from './jiraUserField';

export const JiraSingleSelectUserPickerFieldSchema = apiObject({
  fieldId: z.string(),
  user: JiraUserFieldSchema.optional(),
});

export type JiraSingleSelectUserPickerField = z.infer<typeof JiraSingleSelectUserPickerFieldSchema>;

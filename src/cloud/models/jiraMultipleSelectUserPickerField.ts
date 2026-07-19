import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraUserFieldSchema } from './jiraUserField';

export const JiraMultipleSelectUserPickerFieldSchema = apiObject({
  fieldId: z.string(),
  users: z.array(JiraUserFieldSchema).optional(),
});

export type JiraMultipleSelectUserPickerField = z.infer<typeof JiraMultipleSelectUserPickerFieldSchema>;

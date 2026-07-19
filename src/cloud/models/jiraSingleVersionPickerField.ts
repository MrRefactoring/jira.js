import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraVersionFieldSchema } from './jiraVersionField';

export const JiraSingleVersionPickerFieldSchema = apiObject({
  fieldId: z.string(),
  version: JiraVersionFieldSchema,
});

export type JiraSingleVersionPickerField = z.infer<typeof JiraSingleVersionPickerFieldSchema>;

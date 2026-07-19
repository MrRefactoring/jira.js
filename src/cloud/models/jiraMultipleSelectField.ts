import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraSelectedOptionFieldSchema } from './jiraSelectedOptionField';

export const JiraMultipleSelectFieldSchema = apiObject({
  fieldId: z.string(),
  options: z.array(JiraSelectedOptionFieldSchema),
});

export type JiraMultipleSelectField = z.infer<typeof JiraMultipleSelectFieldSchema>;

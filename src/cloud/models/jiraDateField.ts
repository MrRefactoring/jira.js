import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraDateInputSchema } from './jiraDateInput';

export const JiraDateFieldSchema = apiObject({
  date: JiraDateInputSchema.optional(),
  fieldId: z.string(),
});

export type JiraDateField = z.infer<typeof JiraDateFieldSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraSelectedOptionFieldSchema } from './jiraSelectedOptionField';

export const JiraCascadingSelectFieldSchema = apiObject({
  childOptionValue: JiraSelectedOptionFieldSchema.optional(),
  fieldId: z.string(),
  parentOptionValue: JiraSelectedOptionFieldSchema,
});

export type JiraCascadingSelectField = z.infer<typeof JiraCascadingSelectFieldSchema>;

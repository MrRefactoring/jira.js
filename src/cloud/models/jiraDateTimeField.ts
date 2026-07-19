import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraDateTimeInputSchema } from './jiraDateTimeInput';

export const JiraDateTimeFieldSchema = apiObject({
  dateTime: JiraDateTimeInputSchema,
  fieldId: z.string(),
});

export type JiraDateTimeField = z.infer<typeof JiraDateTimeFieldSchema>;

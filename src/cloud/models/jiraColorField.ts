import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraColorInputSchema } from './jiraColorInput';

export const JiraColorFieldSchema = apiObject({
  color: JiraColorInputSchema,
  fieldId: z.string(),
});

export type JiraColorField = z.infer<typeof JiraColorFieldSchema>;

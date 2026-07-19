import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraRichTextInputSchema } from './jiraRichTextInput';

export const JiraRichTextFieldSchema = apiObject({
  fieldId: z.string(),
  richText: JiraRichTextInputSchema,
});

export type JiraRichTextField = z.infer<typeof JiraRichTextFieldSchema>;

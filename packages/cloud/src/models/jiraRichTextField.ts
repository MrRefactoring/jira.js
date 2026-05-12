import { z } from 'zod';
import { JiraRichTextInputSchema } from '#/models/jiraRichTextInput';

export const JiraRichTextFieldSchema = z.object({
  fieldId: z.string(),
  richText: JiraRichTextInputSchema,
});

export type JiraRichTextField = z.infer<typeof JiraRichTextFieldSchema>;

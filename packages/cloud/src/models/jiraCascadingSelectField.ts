import { z } from 'zod';
import { JiraSelectedOptionFieldSchema } from '#/models/jiraSelectedOptionField';

export const JiraCascadingSelectFieldSchema = z.object({
  childOptionValue: JiraSelectedOptionFieldSchema.optional(),
  fieldId: z.string(),
  parentOptionValue: JiraSelectedOptionFieldSchema,
});

export type JiraCascadingSelectField = z.infer<typeof JiraCascadingSelectFieldSchema>;

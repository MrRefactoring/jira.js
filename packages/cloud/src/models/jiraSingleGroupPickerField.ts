import { z } from 'zod';
import { JiraGroupInputSchema } from '#/models/jiraGroupInput';

export const JiraSingleGroupPickerFieldSchema = z.object({
  fieldId: z.string(),
  group: JiraGroupInputSchema,
});

export type JiraSingleGroupPickerField = z.infer<typeof JiraSingleGroupPickerFieldSchema>;

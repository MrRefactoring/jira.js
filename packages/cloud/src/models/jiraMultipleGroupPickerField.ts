import { z } from 'zod';
import { JiraGroupInputSchema } from '#/models/jiraGroupInput';

export const JiraMultipleGroupPickerFieldSchema = z.object({
  fieldId: z.string(),
  groups: z.array(JiraGroupInputSchema),
});

export type JiraMultipleGroupPickerField = z.infer<typeof JiraMultipleGroupPickerFieldSchema>;

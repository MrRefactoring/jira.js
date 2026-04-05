import { z } from 'zod';
import { JiraColorInputSchema } from '#/models/jiraColorInput';

export const JiraColorFieldSchema = z.object({
  color: JiraColorInputSchema,
  fieldId: z.string(),
});

export type JiraColorField = z.infer<typeof JiraColorFieldSchema>;

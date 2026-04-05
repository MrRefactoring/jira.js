import { z } from 'zod';

export const JiraNumberFieldSchema = z.object({
  fieldId: z.string(),
  value: z.number().optional(),
});

export type JiraNumberField = z.infer<typeof JiraNumberFieldSchema>;

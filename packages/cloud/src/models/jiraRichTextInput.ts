import { z } from 'zod';

export const JiraRichTextInputSchema = z.object({
  adfValue: z.record(z.string(), z.any()).optional(),
});

export type JiraRichTextInput = z.infer<typeof JiraRichTextInputSchema>;

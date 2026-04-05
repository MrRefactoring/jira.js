import { z } from 'zod';

export const JiraSingleLineTextFieldSchema = z.object({
  fieldId: z.string(),
  text: z.string(),
});

export type JiraSingleLineTextField = z.infer<typeof JiraSingleLineTextFieldSchema>;

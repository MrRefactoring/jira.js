import { z } from 'zod';

/** The default text for a text area custom field. */
export const CustomFieldContextDefaultValueTextAreaSchema = z.object({
  /** The default text. The maximum length is 32767 characters. */
  text: z.string().optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueTextArea = z.infer<typeof CustomFieldContextDefaultValueTextAreaSchema>;

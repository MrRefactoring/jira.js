import { z } from 'zod';

/** The default text for a text custom field. */
export const CustomFieldContextDefaultValueTextFieldSchema = z.object({
  /** The default text. The maximum length is 254 characters. */
  text: z.string().optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueTextField = z.infer<typeof CustomFieldContextDefaultValueTextFieldSchema>;

import { z } from 'zod';

/** The default text for a read only custom field. */
export const CustomFieldContextDefaultValueReadOnlySchema = z.object({
  /** The default text. The maximum length is 255 characters. */
  text: z.string().optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueReadOnly = z.infer<typeof CustomFieldContextDefaultValueReadOnlySchema>;

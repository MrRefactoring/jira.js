import { z } from 'zod';

/** The default value for a URL custom field. */
export const CustomFieldContextDefaultValueURLSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  type: z.string(),
  /** The default URL. */
  url: z.string(),
});

export type CustomFieldContextDefaultValueURL = z.infer<typeof CustomFieldContextDefaultValueURLSchema>;

import { z } from 'zod';

/** Default value for a labels custom field. */
export const CustomFieldContextDefaultValueLabelsSchema = z.object({
  /** The default labels value. */
  labels: z.array(z.string()),
  type: z.string(),
});

export type CustomFieldContextDefaultValueLabels = z.infer<typeof CustomFieldContextDefaultValueLabelsSchema>;

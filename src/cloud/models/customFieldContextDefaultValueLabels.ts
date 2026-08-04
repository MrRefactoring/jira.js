import { z } from 'zod';
import { apiObject } from '#/core';
/** Default value for a labels custom field. */

export const CustomFieldContextDefaultValueLabelsSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default labels value. */
  labels: z.array(z.string()),
  type: z.enum(['labels']),
});

export type CustomFieldContextDefaultValueLabels = z.infer<typeof CustomFieldContextDefaultValueLabelsSchema>;

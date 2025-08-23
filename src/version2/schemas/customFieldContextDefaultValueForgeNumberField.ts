import { z } from 'zod';

/** Default value for a Forge number custom field. */
export const CustomFieldContextDefaultValueForgeNumberFieldSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default floating-point number. */
  number: z.number(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueForgeNumberField = z.infer<
  typeof CustomFieldContextDefaultValueForgeNumberFieldSchema
>;

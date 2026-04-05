import { z } from 'zod';

/** The default text for a Forge string custom field. */
export const CustomFieldContextDefaultValueForgeStringFieldSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default text. The maximum length is 254 characters. */
  text: z.string().optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueForgeStringField = z.infer<
  typeof CustomFieldContextDefaultValueForgeStringFieldSchema
>;

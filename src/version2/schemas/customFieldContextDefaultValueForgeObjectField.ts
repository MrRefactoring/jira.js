import { z } from 'zod';

/** The default value for a Forge object custom field. */
export const CustomFieldContextDefaultValueForgeObjectFieldSchema = z.object({
  /** The default JSON object. */
  object: z.object({}).optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueForgeObjectField = z.infer<
  typeof CustomFieldContextDefaultValueForgeObjectFieldSchema
>;

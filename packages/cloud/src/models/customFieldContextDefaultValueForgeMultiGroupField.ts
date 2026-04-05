import { z } from 'zod';

/** The default value for a Forge collection of groups custom field. */
export const CustomFieldContextDefaultValueForgeMultiGroupFieldSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The IDs of the default groups. */
  groupIds: z.array(z.string()),
  type: z.string(),
});

export type CustomFieldContextDefaultValueForgeMultiGroupField = z.infer<
  typeof CustomFieldContextDefaultValueForgeMultiGroupFieldSchema
>;

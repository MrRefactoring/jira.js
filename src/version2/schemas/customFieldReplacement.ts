import { z } from 'zod';

/** Details about the replacement for a deleted version. */
export const CustomFieldReplacementSchema = z.object({
  /** The ID of the custom field in which to replace the version number. */
  customFieldId: z.number().int().optional(),
  /** The version number to use as a replacement for the deleted version. */
  moveTo: z.number().int().optional(),
});

export type CustomFieldReplacement = z.infer<typeof CustomFieldReplacementSchema>;

import { z } from 'zod';

/** List of custom fields using the version. */
export const VersionUsageInCustomFieldSchema = z.object({
  /** The ID of the custom field. */
  customFieldId: z.number().int().optional(),
  /** The name of the custom field. */
  fieldName: z.string().optional(),
  /** Count of the issues where the custom field contains the version. */
  issueCountWithVersionInCustomField: z.number().int().optional(),
});

export type VersionUsageInCustomField = z.infer<typeof VersionUsageInCustomFieldSchema>;

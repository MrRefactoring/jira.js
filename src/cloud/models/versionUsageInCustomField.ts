import { z } from 'zod';
import { apiObject } from '#/core';
/** List of custom fields using the version. */

export const VersionUsageInCustomFieldSchema = apiObject({
  /** The ID of the custom field. */
  customFieldId: z.number().optional(),
  /** The name of the custom field. */
  fieldName: z.string().optional(),
  /** Count of the issues where the custom field contains the version. */
  issueCountWithVersionInCustomField: z.number().optional(),
});

export type VersionUsageInCustomField = z.infer<typeof VersionUsageInCustomFieldSchema>;

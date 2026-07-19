import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about the replacement for a deleted version. */

export const CustomFieldReplacementSchema = apiObject({
  /** The ID of the custom field in which to replace the version number. */
  customFieldId: z.number().optional(),
  /** The version number to use as a replacement for the deleted version. */
  moveTo: z.number().optional(),
});

export type CustomFieldReplacement = z.infer<typeof CustomFieldReplacementSchema>;

import { z } from 'zod';
import { CustomFieldValueUpdateDetailsSchema } from '../models';

export const UpdateCustomFieldValueSchema = z
  .object({
    /** The ID or key of the custom field. For example, `customfield_10010`. */
    fieldIdOrKey: z.string(),
    /** Whether to generate a changelog for this update. */
    generateChangelog: z.boolean().optional(),
  })
  .extend(CustomFieldValueUpdateDetailsSchema.shape);

export type UpdateCustomFieldValue = z.input<typeof UpdateCustomFieldValueSchema>;

import { z } from 'zod';
import { CustomFieldValueUpdateSchema } from './customFieldValueUpdate';

export const UpdateCustomFieldValueParametersSchema = z.object({
  /** The ID or key of the custom field. For example, `customfield_10010`. */
  fieldIdOrKey: z.string(),
  /** Whether to generate a changelog for this update. */
  generateChangelog: z.boolean().optional(),
  /** The list of custom field update details. */
  updates: z.array(CustomFieldValueUpdateSchema).optional(),
});

export type UpdateCustomFieldValueParameters = z.infer<typeof UpdateCustomFieldValueParametersSchema>;

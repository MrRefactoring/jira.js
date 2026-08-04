import { z } from 'zod';
import { CustomFieldConfigurationsSchema } from '../models';

export const UpdateCustomFieldConfigurationSchema = z
  .object({
    /** The ID or key of the custom field, for example `customfield_10000`. */
    fieldIdOrKey: z.string(),
  })
  .extend(CustomFieldConfigurationsSchema.shape);

export type UpdateCustomFieldConfiguration = z.input<typeof UpdateCustomFieldConfigurationSchema>;

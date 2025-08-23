import { z } from 'zod';
import { ContextualConfigurationSchema } from './contextualConfiguration';

export const UpdateCustomFieldConfigurationParametersSchema = z.object({
  /** The ID or key of the custom field, for example `customfield_10000`. */
  fieldIdOrKey: z.string(),
  /** The list of custom field configuration details. */
  configurations: z.array(ContextualConfigurationSchema),
});

export type UpdateCustomFieldConfigurationParameters = z.infer<typeof UpdateCustomFieldConfigurationParametersSchema>;

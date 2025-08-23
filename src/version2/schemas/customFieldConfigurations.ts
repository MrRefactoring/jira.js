import { z } from 'zod';
import { ContextualConfigurationSchema } from './contextualConfiguration';

/** Details of configurations for a custom field. */
export const CustomFieldConfigurationsSchema = z.object({
  /** The list of custom field configuration details. */
  configurations: z.array(ContextualConfigurationSchema),
});

export type CustomFieldConfigurations = z.infer<typeof CustomFieldConfigurationsSchema>;

import { z } from 'zod';
import { apiObject } from '#/core';
import { ContextualConfigurationSchema } from './contextualConfiguration';
/** Details of configurations for a custom field. */

export const CustomFieldConfigurationsSchema = apiObject({
  /** The list of custom field configuration details. */
  configurations: z.array(ContextualConfigurationSchema),
});

export type CustomFieldConfigurations = z.infer<typeof CustomFieldConfigurationsSchema>;

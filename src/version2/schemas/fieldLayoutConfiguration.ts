import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the field layout configuration. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-rest-api-3-fieldconfiguration-post
 */
export const FieldLayoutConfigurationSchema = z.object({
  /** Whether to show the field */
  field: z.boolean().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** Whether the field is required */
  required: z.boolean().optional(),
});

export type FieldLayoutConfiguration = z.infer<typeof FieldLayoutConfigurationSchema>;

import { z } from 'zod';
import { FieldLayoutConfigurationSchema } from './fieldLayoutConfiguration';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the field layouts. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-group-issue-field-configurations"
 *
 * - Fieldlayout is what users would see as "Field Configuration" in Jira's UI -
 *   https://support.atlassian.com/jira-cloud-administration/docs/manage-issue-field-configurations/
 */
export const FieldLayoutPayloadSchema = z.object({
  /**
   * The field layout configuration. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-rest-api-3-fieldconfiguration-post
   */
  configuration: z.array(FieldLayoutConfigurationSchema).optional(),
  /** The description of the field layout */
  description: z.string().optional(),
  /** The name of the field layout */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type FieldLayoutPayload = z.infer<typeof FieldLayoutPayloadSchema>;

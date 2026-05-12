import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from '#/models/projectCreateResourceIdentifier';

/**
 * Deprecated use
 * [fieldAssociationScheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes)
 * instead Defines the payload for the field layout schemes. See [ Field configuration
 * scheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-rest-api-3-fieldconfigurationscheme-post).*
 *
 * [ How to configure a field configuration
 * scheme](https://support.atlassian.com/jira-cloud-administration/docs/configure-a-field-configuration-scheme/).
 */
export const FieldLayoutSchemePayloadSchema = z.object({
  defaultFieldLayout: ProjectCreateResourceIdentifierSchema.optional(),
  /** The description of the field layout scheme */
  description: z.string().optional(),
  /**
   * There is a default configuration "fieldlayout" that is applied to all issue types using this scheme that don't have
   * an explicit mapping users can create (or re-use existing) configurations for other issue types and map them to this
   * scheme
   */
  explicitMappings: z.record(z.string(), z.any()).optional(),
  /** The name of the field layout scheme */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type FieldLayoutSchemePayload = z.infer<typeof FieldLayoutSchemePayloadSchema>;

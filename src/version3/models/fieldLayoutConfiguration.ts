import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the field layout configuration. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-rest-api-3-fieldconfiguration-post
 */
export interface FieldLayoutConfiguration {
  /** Whether to show the field */
  field?: boolean;
  pcri?: ProjectCreateResourceIdentifier;
  /** Whether the field is required */
  required?: boolean;
}

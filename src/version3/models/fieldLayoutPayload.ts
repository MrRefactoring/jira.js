import type { FieldLayoutConfiguration } from './fieldLayoutConfiguration';
import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the field layouts. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-group-issue-field-configurations"
 *
 * - Fieldlayout is what users would see as "Field Configuration" in Jira's UI -
 *   https://support.atlassian.com/jira-cloud-administration/docs/manage-issue-field-configurations/
 */
export interface FieldLayoutPayload {
  /**
   * The field layout configuration. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-rest-api-3-fieldconfiguration-post
   */
  configuration?: FieldLayoutConfiguration[];
  /** The description of the field layout */
  description?: string;
  /** The name of the field layout */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
}

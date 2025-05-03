import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the field layout schemes. See "Field Configuration Scheme" -
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-rest-api-3-fieldconfigurationscheme-post
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-a-field-configuration-scheme/
 */
export interface FieldLayoutSchemePayload {
  defaultFieldLayout?: ProjectCreateResourceIdentifier;
  /** The description of the field layout scheme */
  description?: string;
  /**
   * There is a default configuration "fieldlayout" that is applied to all issue types using this scheme that don't have
   * an explicit mapping users can create (or re-use existing) configurations for other issue types and map them to this
   * scheme
   */
  explicitMappings?: {};
  /** The name of the field layout scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
}

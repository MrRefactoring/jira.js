import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the custom field definitions. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post
 */
export interface CustomFieldPayload {
  /** The type of the custom field */
  cfType?: string;
  /** The description of the custom field */
  description?: string;
  /** The name of the custom field */
  name?: string;
  /**
   * The strategy to use when there is a conflict with an existing custom field. FAIL - Fail execution, this always
   * needs to be unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict?: 'FAIL' | 'USE' | 'NEW' | string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The searcher key of the custom field */
  searcherKey?: string;
}

import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the tabs of the screen. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
 */
export interface TabPayload {
  /**
   * The list of resource identifier of the field associated to the tab. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
   */
  fields?: ProjectCreateResourceIdentifier[];
  /** The name of the tab */
  name?: string;
}

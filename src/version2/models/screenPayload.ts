import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';
import type { TabPayload } from './tabPayload';

/**
 * Defines the payload for the field screens. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-rest-api-3-screens-post
 */
export interface ScreenPayload {
  /** The description of the screen */
  description?: string;
  /** The name of the screen */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
  /**
   * The tabs of the screen. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
   */
  tabs?: TabPayload[];
}

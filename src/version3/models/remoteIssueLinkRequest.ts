import { Application } from './application';
import { RemoteObject } from './remoteObject';

/** Details of a remote issue link. */
export interface RemoteIssueLinkRequest {
  /**
   * An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence
   * would consist of the app ID and page ID, like this: `appId=456&pageId=123`.
   *
   * Setting this field enables the remote issue link details to be updated or deleted using remote system and item
   * details as the record identifier, rather than using the record's Jira ID.
   *
   * The maximum length is 255 characters.
   */
  globalId?: string;
  application?: Application;
  /**
   * Description of the relationship between the issue and the linked item. If not set, the relationship description
   * "links to" is used in Jira.
   */
  relationship?: string;
  object?: RemoteObject;
}

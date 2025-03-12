import type { Application } from './application';
import type { RemoteObject } from './remoteObject';

/** Details of an issue remote link. */
export interface RemoteIssueLink {
  application?: Application;
  /** The global ID of the link, such as the ID of the item on the remote system. */
  globalId?: string;
  /** The ID of the link. */
  id?: number;
  object?: RemoteObject;
  /** Description of the relationship between the issue and the linked item. */
  relationship?: string;
  /** The URL of the link. */
  self?: string;
}

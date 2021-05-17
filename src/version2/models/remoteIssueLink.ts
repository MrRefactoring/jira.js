import { Application } from './application';
import { RemoteObject } from './remoteObject';

/**
 * Details of an issue remote link. */
export interface RemoteIssueLink {
  /** The ID of the link. */
  id?: number;
  /** The URL of the link. */
  self?: string;
  /** The global ID of the link, such as the ID of the item on the remote system. */
  globalId?: string;
  application?: Application;
  /** Description of the relationship between the issue and the linked item. */
  relationship?: string;
  object?: RemoteObject;
}

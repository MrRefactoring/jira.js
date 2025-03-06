import type { Icon } from './icon';
import type { Status } from './status';

/** The linked item. */
export interface RemoteObject {
  /** The URL of the item. */
  url: string;
  /** The title of the item. */
  title: string;
  /** The summary details of the item. */
  summary?: string;
  icon?: Icon;
  status?: Status;
}

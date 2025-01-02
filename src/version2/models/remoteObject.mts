import type { Icon } from './icon.mjs';
import type { Status } from './status.mjs';

/** The linked item. */
export interface RemoteObject {
  icon?: Icon;
  status?: Status;
  /** The summary details of the item. */
  summary?: string;
  /** The title of the item. */
  title: string;
  /** The URL of the item. */
  url: string;
}

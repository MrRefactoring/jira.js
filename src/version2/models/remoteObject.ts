import { Icon } from './icon';
import { Status } from './status';

/**
 * The linked item. */
export interface RemoteObject {
  /** The URL of the item. */
  url: string;
  /** The title of the item. */
  title: string;
  /** The summary details of the item. */
  summary?: string;
  /** Details of the icon for the item. If no icon is defined, the default link icon is used in Jira. */
  icon?: Icon;
  /** The status of the item. */
  status?: Status;
}

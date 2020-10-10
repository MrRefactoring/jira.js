import { Icon } from './icon';
import { Status } from './status';

export interface RemoteObject {
  url: string;
  title: string;
  summary?: string;
  icon?: Icon[];
  status?: Status[];
  [key: string]: unknown;
}

import { Icon } from './icon';

export interface Status {
  resolved: boolean;
  icon: Icon[];
  [key: string]: unknown;
}

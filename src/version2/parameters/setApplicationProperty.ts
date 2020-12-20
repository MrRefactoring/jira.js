import { SimpleApplicationPropertyBean } from '../models';

export interface SetApplicationProperty extends SimpleApplicationPropertyBean {
  /** The key of the application property to update. */
  id: string;
}

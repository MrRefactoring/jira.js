import { SimpleApplicationPropertyBean } from '../models';

export interface SetApplicationProperty extends SimpleApplicationPropertyBean {
  /** The key of the application property to update. */
  id: string;

  body?: {
    /** The ID of the application property. */
    id?: string;

    /** The new value. */
    value?: string;
  };
}

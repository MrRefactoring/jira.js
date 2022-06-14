import { UiModificationContextDetails } from './uiModificationContextDetails';

/** The details of a UI modification. */
export interface CreateUiModificationDetails {
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data?: string;
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts?: UiModificationContextDetails[];
}

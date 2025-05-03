import type { UiModificationContextDetails } from './uiModificationContextDetails';

/** The details of a UI modification. */
export interface UiModificationDetails {
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts?: UiModificationContextDetails[];
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data?: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The ID of the UI modification. */
  id: string;
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: string;
  /** The URL of the UI modification. */
  self: string;
}

import type { StatusCategory } from './statusCategory';

/** A status. */
export interface StatusDetails {
  /** The description of the status. */
  description?: string;
  /** The URL of the icon used to represent the status. */
  iconUrl?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The URL of the status. */
  self?: string;
  statusCategory?: StatusCategory;
}

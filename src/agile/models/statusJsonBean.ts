export interface StatusJsonBean {
  /** The URL of the status. */
  self?: string;
  statusColor?: string;
  /** The description of the status. */
  description?: string;
  /** The URL of the icon used to represent the status. */
  iconUrl?: string;
  /** The name of the status. */
  name?: string;
  /** The ID of the status. */
  id?: string;
  statusCategory?: {
    /** The URL of the status category. */
    self?: string;
    /** The ID of the status category. */
    id?: number;
    /** The key of the status category. */
    key?: string;
    /** The name of the color used to represent the status category. */
    colorName?: string;
    /** The name of the status category. */
    name?: string;
  };
}

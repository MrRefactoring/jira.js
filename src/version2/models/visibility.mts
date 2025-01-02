/** The group or role to which this item is visible. */
export interface Visibility {
  /** The ID of the group or the name of the role that visibility of this item is restricted to. */
  identifier?: string;
  /** Whether visibility of this item is restricted to a group or role. */
  type?: string;
  /**
   * The name of the group or role that visibility of this item is restricted to. Please note that the name of a group
   * is mutable, to reliably identify a group use `identifier`.
   */
  value?: string;
}

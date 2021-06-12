/** The group or role to which this item is visible. */
export interface Visibility {
  /** Whether visibility of this item is restricted to a group or role. */
  type?: string;
  /** The name of the group or role to which visibility of this item is restricted. */
  value?: string;
}

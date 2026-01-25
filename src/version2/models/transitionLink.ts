/** Link information for workflow transitions. */
export interface TransitionLink {
  /** The from port number. */
  fromPort?: number;
  /** The from status reference. */
  fromStatusReference?: string;
  /** The to port number. */
  toPort?: number;
}

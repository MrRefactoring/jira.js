/** The status reference and port that a transition is connected to. */
export interface StatusReferenceAndPort {
  /** The port this transition uses to connect to this status. */
  port?: number;
  /** The reference of this status. */
  statusReference: string;
}

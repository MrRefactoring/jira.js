export interface CustomerCreate {
  /** Customer's email address. */
  email?: string;
  /** Deprecated, please use 'displayName'. */
  fullName?: string;
  /** Customer's name for display in the UI. */
  displayName?: string;
}

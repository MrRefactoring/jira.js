export interface UserLink {
  self?: string;
  /** REST API URL for the customer. */
  jiraRest?: string;
  /**
   * Links to the various sizes of the customer's avatar. Note that this property is deprecated, and will be removed in
   * future versions.
   */
  avatarUrls?: {};
}

export interface SetUserNavProperty {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId?: string;
  /** The key of the nav property. The maximum length is 255 characters. */
  propertyKey: string;
}

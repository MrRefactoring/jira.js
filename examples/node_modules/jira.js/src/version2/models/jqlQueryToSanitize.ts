/**
 * The JQL query to sanitize for the account ID. If the account ID is null, sanitizing is performed for an anonymous
 * user.
 */
export interface JqlQueryToSanitize {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId?: string;
  /** The query to sanitize. */
  query: string;
}

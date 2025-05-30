export interface SetUserColumns {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
}

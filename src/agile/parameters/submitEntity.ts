// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SubmitEntity extends Record<string, any> {
  /**
   * Properties assigned to incidents/components/review data that can then be used for delete / query operations.
   *
   * Examples might be an account or user ID that can then be used to clean up data if an account is removed from the
   * Provider system.
   *
   * Properties are supplied as key/value pairs, and a maximum of 5 properties can be supplied, keys cannot contain ':'
   * or start with '_'.
   */
  properties?: unknown;
  /**
   * Information about the provider. This is useful for auditing, logging, debugging, and other internal uses. It is not
   * considered private information. Hence, it may not contain personally identifiable information.
   */
  providerMetadata?: {
    /** An optional name of the source of the incidents. */
    product?: string;
  };
}

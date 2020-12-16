export interface SubmitFeatureFlags {
  /** Properties assigned to Feature Flag data that can then be used for delete / query operations.

    Examples might be an account or user ID that can then be used to clean up data if an account is removed from the Provider system.

    Note that these properties will never be returned with Feature Flag data. They are not intended for use as metadata to associate with a Feature Flag. Internally they are stored as a hash so that personal information etc. is never stored within Jira.

    Properties are supplied as key/value pairs, a maximum of 5 properties can be supplied, and keys must not contain ':' or start with '_'.
    */
  properties?: {};
  /** A list of Feature Flags to submit to Jira.

    Each Feature Flag may be associated with 1 or more Jira issue keys, and will be associated with any properties included in this request.
    */
  flags?: Record<string, any>[];
  /** Information about the provider. This is useful for auditing, logging, debugging,
    and other internal uses. It is not considered private information. Hence, it may not contain personally
    identifiable information.
    */
  providerMetadata?: {
    /** An optional name of the source of the feature flags. */
    product?: string;
  };
}

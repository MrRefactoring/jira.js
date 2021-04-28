export interface SubmitBuilds {
  /** Properties assigned to build data that can then be used for delete / query operations.

   Examples might be an account or user ID that can then be used to clean up data if an account is removed from
   the Provider system.

   Note that these properties will never be returned with build data. They are not intended for use as
   metadata to associate with a build. Internally they are stored as a hash so that personal information etc.
   is never stored within Jira.

   Properties are supplied as key/value pairs, a maximum of 5 properties can be supplied, and keys must not
   contain ':' or start with '_'.
   */
  properties?: {};
  /** A list of builds to submit to Jira.

   Each build may be associated with one or more Jira issue keys, and will be associated with any properties
   included in this request.
   */
  builds?: any[];
  /** Information about the provider. This is useful for auditing, logging, debugging,
   and other internal uses. It is not considered private information. Hence, it may not contain personally
   identifiable information.
   */
  providerMetadata?: {
    /** An optional name of the source of the builds data. */
    product?: string;
  };
}

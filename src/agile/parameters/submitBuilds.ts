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
  builds?: {
    /** The schema version used for this data.

     Placeholder to support potential schema changes in the future.
     */
    schemaVersion?: string;
    /** An ID that relates a sequence of builds. Depending on your use case this might be a project ID, pipeline ID,
     plan key etc. - whatever logical unit you use to group a sequence of builds.

     The combination of `pipelineId` and `buildNumber` must uniquely identify a build you have provided.
     */
    pipelineId: string;
    /** Identifies a build within the sequence of builds identified by the build `pipelineId`.

     Used to identify the 'most recent' build in that sequence of builds.

     The combination of `pipelineId` and `buildNumber` must uniquely identify a build you have provided.
     */
    buildNumber: number;
    /** A number used to apply an order to the updates to the build, as identified by `pipelineId` and `buildNumber`,
     in the case of out-of-order receipt of update requests.

     It must be a monotonically increasing number. For example, epoch time could be one way to generate the
     `updateSequenceNumber`.

     Updates for a build that is received with an `updateSqeuenceNumber` less than or equal to what is currently
     stored will be ignored.
     */
    updateSequenceNumber: number;
    /** The human-readable name for the build.

     Will be shown in the UI.
     */
    displayName: string;
    /** An optional description to attach to this build.

     This may be anything that makes sense in your system.
     */
    description?: string;
    /** A human-readable string that to provide information about the build.
     */
    label?: string;
    /** The URL to this build in your system.
     */
    url: string;
    /** The state of a build.

     * `pending` - The build is queued, or some manual action is required.
     * `in_progress` - The build is currently running.
     * `successful` - The build completed successfully.
     * `failed` - The build failed.
     * `cancelled` - The build has been cancelled or stopped.
     * `unknown` - The build is in an unknown state.
     */
    state: string;
    /** The last-updated timestamp to present to the user as a summary of the state of the build.
     */
    lastUpdated: string;
    /** The Jira issue keys to associate the build information with.

     You are free to associate issue keys in any way you like. However, we recommend that you use the name
     of the branch the build was executed on, and extract issue keys from that name using a simple regex. This has
     the advantage that it provides an intuitive association of builds to issue keys.
     */
    issueKeys: string[];
    /** Information about tests that were executed during a build.
     */
    testInfo?: {
      /** The total number of tests considered during a build.
       */
      totalNumber: number;
      /** The number of tests that passed during a build.
       */
      numberPassed: number;
      /** The number of tests that failed during a build.
       */
      numberFailed: number;
      /** The number of tests that were skipped during a build.
       */
      numberSkipped?: number;
    };
    /** Optional information that links a build to a commit, branch etc.
     */
    references?: {
      /** Details about the commit the build was run against.
       */
      commit?: {
        /** The ID of the commit. E.g. for a Git repository this would be the SHA1 hash.
         */
        id: string;
        /** An identifier for the repository containing the commit.

         In most cases this should be the URL of the repository in the SCM provider.

         For cases where the build was executed against a local repository etc. this should be some identifier that is
         unique to that repository.
         */
        repositoryUri: string;
      };
      /** Details about the ref the build was run on.
       */
      ref?: {
        /** The name of the ref the build ran on
         */
        name: string;
        /** An identifer for the ref.

         In most cases this should be the URL of the tag/branch etc. in the SCM provider.

         For cases where the build was executed against a local repository etc. this should be something that uniquely
         identifies the ref.
         */
        uri: string;
      };
    }[];
  }[];
  /** Information about the provider. This is useful for auditing, logging, debugging,
   and other internal uses. It is not considered private information. Hence, it may not contain personally
   identifiable information.
   */
  providerMetadata?: {
    /** An optional name of the source of the builds data. */
    product?: string;
  };
}

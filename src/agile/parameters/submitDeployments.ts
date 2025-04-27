export interface SubmitDeployments {
  /**
   * Properties assigned to deployment data that can then be used for delete / query operations.
   *
   * Examples might be an account or user ID that can then be used to clean up data if an account is removed from the
   * Provider system.
   *
   * Properties are supplied as key/value pairs, and a maximum of 5 properties can be supplied, keys cannot contain ':'
   * or start with '_'.
   */
  properties?: unknown;
  /**
   * A list of deployments to submit to Jira.
   *
   * Each deployment may be associated with one or more Jira issue keys, and will be associated with any properties
   * included in this request.
   */
  deployments?: {
    /**
     * This is the identifier for the deployment. It must be unique for the specified pipeline and environment. It must
     * be a monotonically increasing number, as this is used to sequence the deployments.
     */
    deploymentSequenceNumber: number;
    /**
     * A number used to apply an order to the updates to the deployment, as identified by the deploymentSequenceNumber,
     * in the case of out-of-order receipt of update requests. It must be a monotonically increasing number. For
     * example, epoch time could be one way to generate the updateSequenceNumber.
     */
    updateSequenceNumber: number;
    /**
     * The entities to associate the Deployment information with. It must contain at least one of
     * IssueIdOrKeysAssociation or ServiceIdOrKeysAssociation.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    associations: any[];
    /** The human-readable name for the deployment. Will be shown in the UI. */
    displayName: string;
    /** A URL users can use to link to this deployment, in this environment. */
    url: string;
    /** A short description of the deployment */
    description: string;
    /** The last-updated timestamp to present to the user as a summary of the state of the deployment. */
    lastUpdated: string;
    /**
     * An (optional) additional label that may be displayed with deployment information. Can be used to display version
     * information etc. for the deployment.
     */
    label?: string;
    /** The state of the deployment */
    state: 'unknown' | 'pending' | 'in_progress' | 'cancelled' | 'failed' | 'rolled_back' | 'successful' | string;
    /**
     * This object models the Continuous Delivery (CD) Pipeline concept, an automated process (usually comprised of
     * multiple stages) for getting software from version control right through to the production environment.
     */
    pipeline: {
      /** The identifier of this pipeline, must be unique for the provider. */
      id: string;
      /** The name of the pipeline to present to the user. */
      displayName: string;
      /** A URL users can use to link to this deployment pipeline. */
      url: string;
    };
    /** The environment that the deployment is present in. */
    environment: {
      /** The identifier of this environment, must be unique for the provider so that it can be shared across pipelines. */
      id: string;
      /** The name of the environment to present to the user. */
      displayName: string;
      /** The type of the environment. */
      type: 'unmapped' | 'development' | 'testing' | 'staging' | 'production' | string;
    };
    /** A list of commands to be actioned for this Deployment */
    commands?: {
      /** The command name. */
      command?: string;
    }[];
    /**
     * The DeploymentData schema version used for this deployment data.
     *
     * Placeholder to support potential schema changes in the future.
     */
    schemaVersion?: '1.0' | string;
    /** Describes the user who triggered the deployment */
    triggeredBy?: {
      /** The email address of the user. Used to associate the user with a Jira user. Max length is 255 characters. */
      email?: string;
    };
  }[];
  /**
   * Information about the provider. This is useful for auditing, logging, debugging, and other internal uses. It is not
   * considered private information. Hence, it may not contain personally identifiable information.
   */
  providerMetadata?: {
    /** An optional name of the source of the deployments data. */
    product?: string;
  };
}

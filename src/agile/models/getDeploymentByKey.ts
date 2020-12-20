/**
 * Data related to a specific deployment in a specific environment that the deployment is present in.
 * Must specify one of `issueKeys` or `associations`.
 *  */
export interface GetDeploymentByKey {
  /** This is the identifier for the deployment. It must be unique for the specified pipeline and environment. It must be a monotonically increasing number, as this is used to sequence the deployments.
    */
  deploymentSequenceNumber: number;
  /** A number used to apply an order to the updates to the deployment, as identified by the deploymentSequenceNumber, in the case of out-of-order receipt of update requests. It must be a monotonically increasing number. For example, epoch time could be one way to generate the updateSequenceNumber.
    */
  updateSequenceNumber: number;
  /** Deprecated. The Jira issue keys to associate the Deployment information with.
    Should replace this field with the "associations" field to associate Deployment information with issueKeys or other types of associations.
    */
  issueKeys?: string[];
  /** The entities to associate the Deployment information with.
    */
  associations?: Record<string, any>[];
  /** The human-readable name for the deployment. Will be shown in the UI.
    */
  displayName: string;
  /** A URL users can use to link to this deployment, in this environment.
    */
  url: string;
  /** A short description of the deployment
    */
  description: string;
  /** The last-updated timestamp to present to the user as a summary of the state of the deployment.
    */
  lastUpdated: string;
  /** An (optional) additional label that may be displayed with deployment information. Can be used to display version information etc. for the deployment.
    */
  label?: string;
  /** The state of the deployment
    */
  state: string;
  /** This object models the Continuous Delivery (CD) Pipeline concept, an automated process (usually comprised of multiple stages)

    for getting software from version control right through to the production environment.
    */
  pipeline: Record<string, any>;
  /** The environment that the deployment is present in.
    */
  environment: Record<string, any>;
  /** A list of commands to be actioned for this Deployment
    */
  commands?: Record<string, any>[];
  /** The DeploymentData schema version used for this deployment data.

    Placeholder to support potential schema changes in the future.
    */
  schemaVersion?: string;
}

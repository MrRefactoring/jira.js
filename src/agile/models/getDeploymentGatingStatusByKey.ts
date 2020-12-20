/**
 * The current gating status for the given Deployment.
 *  */
export interface GetDeploymentGatingStatusByKey {
  /** This is the identifier for the Deployment.
    */
  deploymentSequenceNumber?: number;
  /** The ID of the Deployment's pipeline.
    */
  pipelineId?: string;
  /** The ID of the Deployment's environment.
    */
  environmentId?: string;
  /** Time the deployment gating status was updated.
    */
  updatedTimestamp?: string;
  /** The gating status
    */
  gatingStatus?: string;
  details?: Record<string, any>[];
}

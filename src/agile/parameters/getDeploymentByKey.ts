export interface GetDeploymentByKey {
  /** The ID of the deployment's pipeline.
   */
  pipelineId: string;
  /** The ID of the deployment's environment.
   */
  environmentId: string;
  /** The deployment's deploymentSequenceNumber.
   */
  deploymentSequenceNumber: number;
}

export interface GetDeploymentGatingStatusByKey {
  /** The ID of the Deployment's pipeline.
   */
  pipelineId: string;
  /** The ID of the Deployment's environment.
   */
  environmentId: string;
  /** The Deployment's deploymentSequenceNumber.
   */
  deploymentSequenceNumber: number;
}

export interface DeleteDeploymentByKey {
  /** The ID of the deployment's pipeline. */
  pipelineId: string;
  /** The ID of the deployment's environment. */
  environmentId: string;
  /** The deployment's deploymentSequenceNumber. */
  deploymentSequenceNumber: number;
  /** @deprecated */
  _updateSequenceNumber?: number;
  /**
   * Only stored data with an `updateSequenceNumber` less than or equal to that provided will be deleted. This can be
   * used help ensure submit/delete requests are applied correctly if issued close together.
   */
  updateSequenceNumber?: number;
}

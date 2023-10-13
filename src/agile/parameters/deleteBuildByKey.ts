export interface DeleteBuildByKey {
  /** The `pipelineId` of the build to delete. */
  pipelineId: string;
  /** The `buildNumber` of the build to delete. */
  buildNumber: number;
  /**
   * Only stored data with an `updateSequenceNumber` less than or equal to that provided will be deleted. This can be
   * used help ensure submit/delete requests are applied correctly if issued close together.
   */
  updateSequenceNumber?: number;
}

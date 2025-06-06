export interface CreateCrossProjectReleaseRequest {
  /** The cross-project release name. */
  name: string;
  /** The IDs of the releases to include in the cross-project release. */
  releaseIds?: number[];
}

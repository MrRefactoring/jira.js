/** @deprecated Use {@link WorklogIdsRequest} instead. */
export type WorklogIdsRequestBean = WorklogIdsRequest;

export interface WorklogIdsRequest {
  /** A list of worklog IDs. */
  ids: number[];
}

/** @deprecated Use EpicRankRequest instead. */
export type EpicRankRequestBean = EpicRankRequest;

export interface EpicRankRequest {
  rankBeforeEpic?: string;
  rankAfterEpic?: string;
  rankCustomFieldId?: number;
}

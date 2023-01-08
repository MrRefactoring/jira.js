/** @deprecated Use {@link EpicRankRequest} instead. */
export type EpicRankRequestBean = EpicRankRequest;

export interface EpicRankRequest {
  rankBeforeEpic?: string;
  rankAfterEpic?: string;
  rankCustomFieldId?: number;
}

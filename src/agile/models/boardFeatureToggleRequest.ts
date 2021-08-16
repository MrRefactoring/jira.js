/** @deprecated Use BoardFeatureToggleRequest instead. */
export type BoardFeatureToggleRequestBean = BoardFeatureToggleRequest;

/** @deprecated Use *FeatureToggleRequest* model instead. */
export interface BoardFeatureToggleRequest {
  boardId?: number;
  feature?: string;
  enabling?: boolean;
}

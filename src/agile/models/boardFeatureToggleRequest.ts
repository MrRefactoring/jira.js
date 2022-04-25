/** @deprecated Use BoardFeatureToggleRequest instead. */
export type BoardFeatureToggleRequestBean = BoardFeatureToggleRequest;

/** @deprecated Use _FeatureToggleRequest_ model instead. */
export interface BoardFeatureToggleRequest {
  boardId?: number;
  feature?: string;
  enabling?: boolean;
}

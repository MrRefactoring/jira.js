/** @deprecated Use BoardFeature instead. */
export type BoardFeatureBean = BoardFeature;

/** @deprecated Use _Feature_ model instead. */
export interface BoardFeature {
  boardFeature?: string;
  boardId?: number;
  state?: string;
  localisedName?: string;
  localisedDescription?: string;
  learnMoreLink?: string;
  imageUri?: string;
  toggleLocked?: boolean;
}

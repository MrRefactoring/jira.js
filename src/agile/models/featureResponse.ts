export interface FeatureResponse {
  features?: {
    boardFeature?: string;
    boardId?: number;
    state?: string;
    localisedName?: string;
    localisedDescription?: string;
    learnMoreLink?: string;
    imageUri?: string;
    featureType?: string;
    localisedGroup?: string;
    permissibleEstimationTypes?: {
      value?: string;
      localisedName?: string;
      localisedDescription?: string;
    }[];
    featureId?: string;
    learnMoreArticleId?: string;
    toggleLocked?: boolean;
  }[];
}

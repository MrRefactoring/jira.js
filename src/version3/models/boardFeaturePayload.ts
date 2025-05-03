/** The payload for setting a board feature */
export interface BoardFeaturePayload {
  /** The key of the feature */
  featureKey?: 'ESTIMATION' | 'SPRINT' | string;
  /** Whether the feature should be turned on or off */
  state?: boolean;
}

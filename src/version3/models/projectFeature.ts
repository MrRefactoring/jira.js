/**
 * Project feature.
 */
export interface ProjectFeature {
  /** Project ID. */
  projectId?: number;
  /** State of the feature. */
  state?: string;
  /** Determines whether a feature can be toggled or not. */
  toggleLocked?: boolean;
  /** Feature's key. */
  feature?: string;
  /** Feature's category. */
  featureCategory?: string;
  /** List of the keys of features required as prerequisites to enable this feature. */
  prerequisites?: string[];
  /** Name to display for this feature, localised. */
  localisedName?: string;
  /** Description to display for this feature, localised. */
  localisedDescription?: string;
  /** Uri to the image that should be used to display this feature. */
  imageUri?: string;
}

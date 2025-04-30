import type { ProjectFeatureToggleRequest } from '../models';

export interface ToggleFeatureForProject extends ProjectFeatureToggleRequest {
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: string | number;
  /** The key of the feature. */
  featureKey: string;
}

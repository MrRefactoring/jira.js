import { ProjectFeature } from './projectFeature';

/**
 * Container for the list of features on the project. */
export interface ProjectFeaturesResponse {
  /** The list of features on the project. */
  features?: ProjectFeature[];
}

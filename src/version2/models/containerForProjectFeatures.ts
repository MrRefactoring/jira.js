import type { ProjectFeature } from './projectFeature';

/** The list of features on a project. */
export interface ContainerForProjectFeatures {
  /** The project features. */
  features?: ProjectFeature[];
}

import type { Paginated } from '../../paginated';
import type { ProjectDetails } from './projectDetails';
import type { PriorityWithSequence } from './priorityWithSequence';

/** A priority scheme with paginated priorities and projects. */
export interface PrioritySchemeWithPaginatedPrioritiesAndProjects {
  default?: boolean;
  /** The ID of the default issue priority. */
  defaultPriorityId?: string;
  /** The description of the priority scheme */
  description?: string;
  /** The ID of the priority scheme. */
  id: string;
  isDefault?: boolean;
  /** The name of the priority scheme */
  name: string;
  priorities?: Paginated<PriorityWithSequence>;
  projects?: Paginated<ProjectDetails>;
  /** The URL of the priority scheme. */
  self?: string;
}

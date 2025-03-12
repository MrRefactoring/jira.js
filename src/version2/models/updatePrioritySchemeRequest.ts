import type { PriorityMapping } from './priorityMapping';
import type { UpdatePrioritiesInSchemeRequest } from './updatePrioritiesInSchemeRequest';
import type { UpdateProjectsInSchemeRequest } from './updateProjectsInSchemeRequest';

/** Details of a priority scheme. */
export interface UpdatePrioritySchemeRequest {
  /** The default priority of the scheme. */
  defaultPriorityId?: number;
  /** The description of the priority scheme. */
  description?: string;
  mappings?: PriorityMapping;
  /** The name of the priority scheme. Must be unique. */
  name?: string;
  priorities?: UpdatePrioritiesInSchemeRequest;
  projects?: UpdateProjectsInSchemeRequest;
}

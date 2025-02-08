import { PriorityMapping } from './priorityMapping';
import { UpdatePrioritiesInSchemeRequest } from './updatePrioritiesInSchemeRequest';
import { UpdateProjectsInSchemeRequest } from './updateProjectsInSchemeRequest';

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

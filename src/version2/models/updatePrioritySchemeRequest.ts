import { PriorityMapping } from './priorityMapping';
import { UpdatePrioritiesInSchemeRequestBean } from './updatePrioritiesInSchemeRequestBean';
import { UpdateProjectsInSchemeRequestBean } from './updateProjectsInSchemeRequestBean';

/** Details of a priority scheme. */
export interface UpdatePrioritySchemeRequest {
  /** The default priority of the scheme. */
  defaultPriorityId?: number;
  /** The description of the priority scheme. */
  description?: string;
  mappings?: PriorityMapping;
  /** The name of the priority scheme. Must be unique. */
  name?: string;
  priorities?: UpdatePrioritiesInSchemeRequestBean;
  projects?: UpdateProjectsInSchemeRequestBean;
}

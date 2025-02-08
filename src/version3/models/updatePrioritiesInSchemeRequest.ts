import { PrioritySchemeChangesWithoutMappings } from './prioritySchemeChangesWithoutMappings';
import { PrioritySchemeChangesWithMappings } from './prioritySchemeChangesWithMappings';

/** Update priorities in a scheme */
export interface UpdatePrioritiesInSchemeRequest {
  add?: PrioritySchemeChangesWithoutMappings;
  remove?: PrioritySchemeChangesWithMappings;
}

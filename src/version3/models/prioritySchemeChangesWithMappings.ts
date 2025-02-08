import { PriorityMapping } from './priorityMapping';

export interface PrioritySchemeChangesWithMappings {
  /** Affected entity ids. */
  ids: number[];
  /** Instructions to migrate issues. */
  mappings?: PriorityMapping[];
}

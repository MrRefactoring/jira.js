import type { PriorityMapping } from './priorityMapping';

/** Details of a new priority scheme */
export interface CreatePrioritySchemeDetails {
  /** The ID of the default priority for the priority scheme. */
  defaultPriorityId: number;
  /** The description of the priority scheme. */
  description?: string;
  mappings?: PriorityMapping;
  /** The name of the priority scheme. Must be unique. */
  name: string;
  /** The IDs of priorities in the scheme. */
  priorityIds: number[];
  /** The IDs of projects that will use the priority scheme. */
  projectIds?: number[];
}

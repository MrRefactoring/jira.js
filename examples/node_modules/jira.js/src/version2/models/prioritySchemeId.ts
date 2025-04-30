import type { TaskProgressNode } from './taskProgressNode';

/** The ID of a priority scheme. */
export interface PrioritySchemeId {
  /** The ID of the priority scheme. */
  id?: string;
  task?: TaskProgressNode;
}

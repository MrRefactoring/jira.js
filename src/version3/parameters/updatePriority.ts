import type { UpdatePriorityDetails } from '../models/index.js';

export interface UpdatePriority extends UpdatePriorityDetails {
  /** The ID of the issue priority. */
  id: string;
}

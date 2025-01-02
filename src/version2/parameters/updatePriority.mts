import { UpdatePriorityDetails } from '../models/index.mjs';

export interface UpdatePriority extends UpdatePriorityDetails {
  /** The ID of the issue priority. */
  id: string;
}

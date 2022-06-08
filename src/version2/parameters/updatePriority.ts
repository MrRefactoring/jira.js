import { UpdatePriorityDetails } from '../models';

export interface UpdatePriority extends UpdatePriorityDetails {
  /** The ID of the issue priority. */
  id: string;
}

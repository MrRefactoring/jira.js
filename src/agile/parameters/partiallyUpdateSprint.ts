import { Sprint } from '../models';

export interface PartiallyUpdateSprint {
  /** The ID of the sprint to update. */
  sprintId: number;
  id?: number;
  self?: string;
  state?: string | Sprint.State;
  name?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  completeDate?: string;
  createdDate?: string;
  originBoardId?: number;
  goal?: string;
}

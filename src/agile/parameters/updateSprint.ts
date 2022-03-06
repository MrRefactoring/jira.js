export interface UpdateSprint {
  /** The ID of the sprint to update. */
  sprintId: number;
  id?: number;
  self?: string;
  state?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  originBoardId?: number;
  createdDate?: string;
  goal?: string;
}

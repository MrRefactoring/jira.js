/** @deprecated Use SprintCreate instead. */
export type SprintCreateBean = SprintCreate;

export interface SprintCreate {
  name?: string;
  startDate?: string;
  endDate?: string;
  originBoardId?: number;
  goal?: string;
}

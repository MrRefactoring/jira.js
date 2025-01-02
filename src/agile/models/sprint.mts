export interface Sprint {
  id: number;
  self?: string;
  state: 'future' | 'active' | 'closed' | string;
  name: string;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  createdDate?: string;
  originBoardId?: number;
  goal?: string;
}

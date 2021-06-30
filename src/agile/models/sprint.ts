export type SprintBean = Sprint;

export interface Sprint {
  id: number;
  self?: string;
  state: string | Sprint.State;
  name: string;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  originBoardId?: number;
  goal?: string;
}

export namespace Sprint {
  export enum State {
    Future = 'future',
    Active = 'active',
    Closed = 'closed',
  }
}

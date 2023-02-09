export interface CreateBoard {
  name: string;
  type: 'scrum' | 'kanban' | string;
  filterId: number;
  location?: {
    type?: string;
    projectKeyOrId?: string;
  };
}

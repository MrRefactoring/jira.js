export interface CreateBoard {
  name: string;
  type: 'kanban' | 'scrum' | 'agility' | string;
  filterId: number;
  location?: {
    type?: 'project' | 'user' | string;
    projectKeyOrId?: string;
  };
}

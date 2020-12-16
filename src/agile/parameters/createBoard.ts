export interface CreateBoard {
  name?: string;
  type?: string;
  filterId?: number;
  location?: {
    type?: string;
    projectKeyOrId?: string;
  };
}

export interface BoardCreateBean {
  name?: string;
  type?: string;
  filterId?: number;
  location?: {
    type?: string;
    projectKeyOrId?: string;
  };
}

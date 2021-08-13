/** @deprecated Use BoardCreate instead. */
export type BoardCreateBean = BoardCreate;

export interface BoardCreate {
  name?: string;
  type?: string;
  filterId?: number;
  location?: {
    type?: string;
    projectKeyOrId?: string;
  };
}

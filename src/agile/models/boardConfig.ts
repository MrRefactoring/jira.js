/** @deprecated Use {@link BoardConfig} instead. */
export type BoardConfigBean = BoardConfig;

export interface BoardConfig {
  id?: number;
  name?: string;
  type?: string;
  self?: string;
  location?: {
    type?: string;
    projectKeyOrId?: string;
  };
  filter?: {
    id?: string;
    self?: string;
  };
  subQuery?: {
    query?: string;
  };
  columnConfig?: {
    columns?: {
      name?: string;
      statuses?: {
        id?: string;
        self?: string;
      }[];
      min?: number;
      max?: number;
    }[];
    constraintType?: string;
  };
  estimation?: {
    type?: string;
    field?: {
      fieldId?: string;
      displayName?: string;
    };
  };
  ranking?: {
    rankCustomFieldId?: number;
  };
}

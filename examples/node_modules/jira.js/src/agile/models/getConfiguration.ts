export interface GetConfiguration {
  columnConfig?: {
    columns?: {
      max?: number;
      min?: number;
      name?: string;
      statuses?: {
        id?: string;
        self?: string;
      }[];
    }[];
    constraintType?: string;
  };
  estimation?: {
    field?: {
      displayName?: string;
      fieldId?: string;
    };
    type?: string;
  };
  filter?: {
    id?: string;
    self?: string;
  };
  id?: number;
  location?: {
    projectKeyOrId?: string;
    type?: 'project' | 'user' | string;
  };
  name?: string;
  ranking?: {
    rankCustomFieldId?: number;
  };
  self?: string;
  subQuery?: {
    query?: string;
  };
  type?: string;
}

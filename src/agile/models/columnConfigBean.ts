export interface ColumnConfigBean {
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
}

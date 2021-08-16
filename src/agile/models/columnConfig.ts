/** @deprecated Use ColumnConfig instead. */
export type ColumnConfigBean = ColumnConfig;

export interface ColumnConfig {
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

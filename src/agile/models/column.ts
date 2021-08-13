/** @deprecated Use Column instead. */
export type ColumnBean = Column;

export interface Column {
  name?: string;
  statuses?: {
    id?: string;
    self?: string;
  }[];
  min?: number;
  max?: number;
}

export interface ColumnBean {
  name?: string;
  statuses?: {
    id?: string;
    self?: string;
  }[];
  min?: number;
  max?: number;
}
